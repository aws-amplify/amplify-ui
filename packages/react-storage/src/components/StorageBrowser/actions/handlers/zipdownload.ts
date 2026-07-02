import { getUrl } from '../../storage-internal';
import type { DownloadHandler, DownloadHandlerInput } from './download';
import type { TaskResult, TaskResultStatus } from './types';
import { isFunction } from '@aws-amplify/ui';
import { getProgress } from './utils';
import { ZipWriter } from '@zip.js/zip.js';

type DownloadTaskResult = TaskResult<TaskResultStatus, { url: URL }>;

// Batch state
let zipWriter: ZipWriter<unknown> | null = null;
let zipReadable: ReadableStream<Uint8Array> | null = null;
let downloadId: string | null = null;
let blobPromise: Promise<Blob> | null = null;
let swReady: Promise<void> = Promise.resolve();
let cancelled = false;
let batchAbort: AbortController | null = null;
let batchTotal = 0;
let batchDone = 0;

// SW cancel listener — added when SW is confirmed active, removed on reset
let swCancelListener: ((event: MessageEvent) => void) | null = null;

const constructBucket = ({
  bucket: bucketName,
  region,
}: DownloadHandlerInput['config']) => ({ bucketName, region });

const collectBlob = async (
  readable: ReadableStream<Uint8Array>
): Promise<Blob> => {
  const reader = readable.getReader();
  const chunks: Uint8Array[] = [];
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return new Blob(chunks, { type: 'application/zip' });
};

const reset = (): void => {
  if (swCancelListener && navigator.serviceWorker) {
    navigator.serviceWorker.removeEventListener('message', swCancelListener);
    swCancelListener = null;
  }
  zipWriter = null;
  zipReadable = null;
  downloadId = null;
  blobPromise = null;
  swReady = Promise.resolve();
  cancelled = false;
  batchAbort = null;
  batchTotal = 0;
  batchDone = 0;
};

const cancelBatch = (): void => {
  cancelled = true;
  batchAbort?.abort();
  if (!blobPromise && downloadId && navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage({
      cancel: true,
      downloadId,
    });
  }
  // eslint-disable-next-line no-console
  console.log(`[zip] cancelBatch: batchDone=${batchDone}/${batchTotal}`);
};

const download = async ({ config, data, options }: DownloadHandlerInput) => {
  const { customEndpoint, credentials, accountId } = config;
  const { key } = data;
  const [filename] = key.split('/').reverse();

  await swReady;
  if (cancelled) {
    // eslint-disable-next-line no-console
    console.log(
      `[zip] early cancel (post-swReady): ${key}, batchDone=${batchDone}/${batchTotal}`
    );
    throw new Error('Download cancelled');
  }

  const { url } = await getUrl({
    path: key,
    options: {
      bucket: constructBucket(config),
      customEndpoint,
      locationCredentialsProvider: credentials,
      validateObjectExistence: true,
      contentDisposition: 'attachment',
      expectedBucketOwner: accountId,
    },
  });

  const response = await fetch(url, {
    mode: 'cors',
    signal: batchAbort!.signal,
  });
  const size = data.size ?? +(response.headers.get('content-length') ?? 0);
  let transferred = 0;

  // Intermediate stream decouples fetch errors from zip.js internals.
  // Closing this stream cleanly lets zip.js finalize the entry without
  // uncaught AbortError rejections from its codec-worker.
  let streamController: ReadableStreamDefaultController<Uint8Array> | null =
    null;
  const fileStream = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
    },
  });

  // Start the zip add — returns a promise that resolves when the
  // ReadableStream we gave it closes.
  const addPromise = zipWriter!.add(filename, fileStream, { level: 0 });

  // If the browser cancels the download (dismisses dialog), the SW response
  // stream errors, which propagates to the TransformStream writable, which
  // causes addPromise to reject. Set cancelled immediately so the read loop
  // stops on the next chunk — preventing wasted network.
  addPromise.catch(() => {
    cancelled = true;
  });

  try {
    const reader = response.body!.getReader();
    for (;;) {
      if (cancelled) {
        // eslint-disable-next-line no-console
        console.log(
          `[zip] cancel mid-stream: ${key}, transferred=${transferred}`
        );
        streamController!.close();
        throw new Error('Download cancelled');
      }
      const { value, done } = await reader.read();
      if (done) break;
      transferred += value.length;
      streamController!.enqueue(value);

      if (isFunction(options?.onProgress)) {
        options!.onProgress(
          data,
          getProgress({ totalBytes: size, transferredBytes: transferred }),
          'PENDING'
        );
      }
    }

    // All chunks read — close the stream so zip.js finalizes the entry
    streamController!.close();
    await addPromise;

    if (isFunction(options?.onProgress)) {
      options!.onProgress(data, 1, 'COMPLETE');
    }
  } catch (e) {
    const err = e as Error;
    try {
      streamController!.close();
    } catch {
      /* already closed */
    }
    try {
      await addPromise;
    } catch {
      /* swallow */
    }
    throw cancelled || err.name === 'AbortError'
      ? new Error('Download cancelled')
      : err;
  }

  return filename;
};

const zipDownloadHandler: DownloadHandler = (() => {
  const handler: DownloadHandler = ({ config, data, all, options }) => {
    const { key } = data;
    const firstKey = all[0]?.key ?? key;
    const folder =
      firstKey.substring(0, firstKey.lastIndexOf('/')).split('/').pop() ??
      'archive';

    // eslint-disable-next-line no-console
    console.log(
      `[zip] handler called: ${key}, all.length=${
        all.length
      }, batchDone=${batchDone}/${batchTotal}, cancelled=${cancelled}, zipWriter=${!!zipWriter}`
    );

    // ─── STEP 1: Handle cancelled state ───
    if (cancelled) {
      batchDone++;
      // eslint-disable-next-line no-console
      console.log(
        `[zip] CANCELLED skip: ${key}, batchDone=${batchDone}/${batchTotal}`
      );
      const result = Promise.resolve<DownloadTaskResult>({
        status: 'CANCELED' as const,
        message: 'Download cancelled',
      });
      if (batchDone >= batchTotal) result.finally(reset);
      return { result };
    }

    // ─── STEP 2: Initialize zip writer on first file ───
    if (!zipWriter) {
      const { readable, writable } = new TransformStream<
        Uint8Array,
        Uint8Array
      >();
      zipReadable = readable;
      zipWriter = new ZipWriter(writable);
      downloadId = `${folder}-${Date.now()}.zip`;
      batchAbort = new AbortController();
      batchTotal = all.length;
      batchDone = 0;
      // eslint-disable-next-line no-console
      console.log(`[zip] INIT batch: total=${all.length}`);

      if (navigator.serviceWorker) {
        swReady = navigator.serviceWorker.getRegistration('/').then((reg) => {
          if (!reg?.active) {
            blobPromise = collectBlob(zipReadable!);
            return;
          }
          // Listen for browser-initiated cancel (e.g. download dialog dismissed)
          swCancelListener = (event: MessageEvent) => {
            const msg = event.data as
              | { type?: string; downloadId?: string }
              | undefined;
            if (
              msg?.type === 'download-cancelled' &&
              msg.downloadId === downloadId
            ) {
              cancelled = true;
              batchAbort?.abort();
            }
          };
          navigator.serviceWorker.addEventListener('message', swCancelListener);

          reg.active.postMessage({ downloadId, stream: zipReadable }, [
            zipReadable as unknown as Transferable,
          ]);
          setTimeout(() => {
            const a = document.createElement('a');
            a.href = `/amplify-storage-download/${downloadId}`;
            a.download = `${folder}.zip`;
            a.click();
          }, 0);
        });
      } else {
        blobPromise = collectBlob(zipReadable);
      }
    }

    // ─── STEP 3: Normal download ───
    return {
      cancel: () => {
        cancelBatch();
        // UI cancel: useProcessTasks marks remaining QUEUED tasks as CANCELED
        // and won't call our handler again. Reset now — the in-flight file's
        // promise chain will settle harmlessly against the cleared state.
        reset();
      },
      result: download({ config, data, all, options })
        .then((): DownloadTaskResult => ({ status: 'COMPLETE' as const }))
        .catch((e): DownloadTaskResult => {
          const err = e as Error;
          if (
            err.message === 'Download cancelled' ||
            err.name === 'AbortError'
          ) {
            cancelled = true;
            return {
              status: 'CANCELED' as const,
              message: 'Download cancelled',
            };
          }
          return { status: 'FAILED', message: err.message, error: err };
        })
        .then((taskResult) => {
          batchDone++;
          // eslint-disable-next-line no-console
          console.log(
            `[zip] file done: ${key}, status=${taskResult.status}, batchDone=${batchDone}/${batchTotal}, cancelled=${cancelled}`
          );
          if (batchDone >= batchTotal) {
            // eslint-disable-next-line no-console
            console.log(
              `[zip] batch end: cancelled=${cancelled}, batchDone=${batchDone}/${batchTotal}`
            );
            const cleanup = async () => {
              try {
                if (!cancelled && zipWriter) {
                  await zipWriter.close();
                  if (blobPromise) {
                    const blob = await blobPromise;
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = `${folder}.zip`;
                    a.click();
                    URL.revokeObjectURL(a.href);
                  }
                }
              } catch {
                // zip close failed
              } finally {
                reset();
              }
            };
            cleanup();
          }
          return taskResult;
        }),
    };
  };

  return handler;
})();

export { zipDownloadHandler };
