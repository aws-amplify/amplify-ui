/**
 * Zip Download Handler
 *
 * Downloads multiple S3 files sequentially into a streaming zip archive,
 * delivered via service worker (with blob fallback for browsers without SW support).
 *
 * State machine: IDLE → DOWNLOADING → COMPLETE | CANCELLED
 *
 * Batch state is scoped per download session using a WeakMap keyed by the `all`
 * array identity (guaranteed stable per useProcessTasks invocation).
 * This avoids module-level singleton issues if multiple StorageBrowser instances
 * share the same module.
 *
 * Cancel paths:
 * - UI cancel (onActionCancel button): cancelBatch() → aborts fetch + writable → reset
 * - Browser-dialog cancel: SW stream closes → addPromise rejects → cancelled=true → drain remaining files
 */
import { getUrl } from '../../storage-internal';
import type { DownloadHandler, DownloadHandlerInput } from './download';
import type { TaskData, TaskResult, TaskResultStatus } from './types';
import { isFunction } from '@aws-amplify/ui';
import { getProgress } from './utils';
import { ZipWriter } from '@zip.js/zip.js';

type DownloadTaskResult = TaskResult<TaskResultStatus, { url: URL }>;

// ─── Batch State ───

interface BatchState {
  zipWriter: ZipWriter<unknown>;
  zipWritable: WritableStream<Uint8Array>;
  zipReadable: ReadableStream<Uint8Array> | null;
  downloadId: string;
  blobPromise: Promise<Blob> | null;
  swReady: Promise<void>;
  cancelled: boolean;
  batchAbort: AbortController;
  batchTotal: number;
  batchDone: number;
  keepaliveInterval: ReturnType<typeof setInterval> | null;
  folder: string;
}

/**
 * Batch state is keyed by a stable serialization of the file IDs in the batch.
 * useProcessTasks recreates the `all` array on each handler call (spread + map),
 * so we cannot rely on reference identity. Sorting IDs produces a deterministic
 * key that remains identical across calls for the same set of files.
 */
const batchMap = new Map<string, BatchState>();

/** Derives a stable batch key from the task data array. */
const getBatchKey = (all: readonly TaskData[]): string =>
  all
    .map((item) => item.id)
    .sort()
    .join('\0');

/** Tears down all listeners and removes batch from map. */
const reset = (batchKey: string, state: BatchState): void => {
  if (state.keepaliveInterval) {
    clearInterval(state.keepaliveInterval);
  }
  batchMap.delete(batchKey);
};

/** Aborts the entire batch and tears down state. Idempotent. */
const cancelBatch = (batchKey: string): void => {
  const state = batchMap.get(batchKey);
  if (!state || state.cancelled) return;
  state.cancelled = true;
  state.batchAbort.abort();
  // Terminate the SW response stream by aborting the writable side of the TransformStream.
  // This errors the readable (transferred to SW), which errors the Response, failing the browser download.
  state.zipWritable.abort('Download cancelled').catch(() => {});
  reset(batchKey, state);
};

// ─── Utilities ───

/** Extracts the S3 bucket descriptor from handler config. */
const constructBucket = ({
  bucket: bucketName,
  region,
}: DownloadHandlerInput['config']) => ({ bucketName, region });

/**
 * Derives the zip filename from the first key's parent folder.
 *
 * Examples:
 * - "photos/vacation/beach.jpg" → "vacation"
 * - "photos/file.txt" → "photos"
 * - "file.txt" (no slash) → "archive"
 * - "/file.txt" (slash at index 0 only) → "archive"
 *
 * For root-level multi-file selections (no common parent folder), returns "archive".
 */
const getFolderName = (key: string): string => {
  const lastSlash = key.lastIndexOf('/');
  if (lastSlash <= 0) return 'archive';
  const parentPath = key.substring(0, lastSlash);
  return parentPath.split('/').pop() ?? 'archive';
};

/** Collects a ReadableStream into a single Blob (fallback when SW is unavailable). */
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

// ─── Service Worker Initialization ───

/**
 * Registers the SW stream transfer (MessageChannel handshake + keepalive)
 * or falls back to in-memory blob collection when SW is unavailable.
 * Mutates state.swReady and state.blobPromise.
 */
const initServiceWorkerStream = (state: BatchState): void => {
  if (!navigator.serviceWorker) {
    state.blobPromise = collectBlob(state.zipReadable!);
    return;
  }

  state.swReady = navigator.serviceWorker
    .getRegistration('/amplify-storage-download/')
    .then((reg) => {
      // If the batch was cancelled while getRegistration() was pending, bail out
      // before wiring up the MessageChannel or keepalive interval. Otherwise the
      // interval would be created after reset() already cleared batchMap, leaking
      // a timer with no reference to clear it.
      if (state.cancelled) {
        return;
      }
      if (!reg?.active) {
        state.blobPromise = collectBlob(state.zipReadable!);
        return;
      }

      // Cancel detection works via addPromise.catch: when the user dismisses the
      // download dialog, the SW response stream closes → TransformStream writable
      // errors → zipWriter.add() rejects → cancelled flag is set.

      const { port1, port2 } = new MessageChannel();
      port1.onmessage = () => {
        const a = document.createElement('a');
        a.href = `/amplify-storage-download/${state.downloadId}`;
        a.download = `${state.folder}.zip`;
        a.click();
        port1.close();
      };
      reg.active.postMessage(
        { downloadId: state.downloadId, stream: state.zipReadable },
        [state.zipReadable as unknown as Transferable, port2]
      );
      state.zipReadable = null;

      // Keepalive pings run for the entire batch duration to prevent Firefox's
      // 30s SW idle timeout from terminating the worker mid-stream.
      state.keepaliveInterval = setInterval(() => {
        reg.active?.postMessage({ type: 'keepalive' });
      }, 10_000);
    });
};

// ─── Per-file Download ───

/**
 * Downloads a single file, streams it into the zip writer entry.
 * Receives the active batch state explicitly — throws if state is invalid.
 */
const download = async (
  state: BatchState,
  { config, data, options }: DownloadHandlerInput
) => {
  const { customEndpoint, credentials, accountId } = config;
  const { key } = data;
  const filename = key.split('/').pop()!;

  await state.swReady;
  if (state.cancelled) {
    throw new Error('Download cancelled');
  }

  // Note: getUrl is a presigned URL generation call (local, fast) — not cancellable
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
    signal: state.batchAbort.signal,
  });
  if (!response.body) throw new Error(`Empty response body for ${key}`);
  const size = data.size ?? +(response.headers.get('content-length') ?? 0);
  let transferred = 0;

  // Intermediate stream decouples fetch errors from zip.js internals.
  // Closing this stream cleanly lets zip.js finalize the entry without
  // uncaught AbortError rejections from its codec-worker.
  let streamController!: ReadableStreamDefaultController<Uint8Array>;
  const fileStream = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
    },
  });

  // Start the zip add — returns a promise that resolves when the
  // ReadableStream we gave it closes.
  const addPromise = state.zipWriter.add(filename, fileStream, { level: 0 });

  // When the browser dismisses the download dialog, the SW response stream
  // closes → TransformStream writable errors → zipWriter.add() rejects.
  // We flag cancellation from two robust signals: an explicit abort in flight
  // (UI cancel aborts batchAbort) or a standard `AbortError` (the DOM error name
  // zip.js surfaces when its output stream is terminated by a dialog cancel).
  // We deliberately avoid substring-matching zip.js's internal error messages,
  // which are not a public API contract. Any other rejection is a genuine error.
  addPromise.catch((error: unknown) => {
    const err = error instanceof Error ? error : undefined;
    if (state.batchAbort.signal.aborted || err?.name === 'AbortError') {
      state.cancelled = true;
    }
    // Re-throw is not needed — the await below will surface the rejection.
  });

  try {
    const reader = response.body.getReader();
    for (;;) {
      if (state.cancelled) {
        streamController.close();
        throw new Error('Download cancelled');
      }
      const { value, done } = await reader.read();
      if (done) break;
      transferred += value.length;
      streamController.enqueue(value);

      if (size > 0 && isFunction(options?.onProgress)) {
        options!.onProgress(
          data,
          getProgress({ totalBytes: size, transferredBytes: transferred }),
          'PENDING'
        );
      }
    }

    // All chunks read — close the stream so zip.js finalizes the entry
    streamController.close();
    await addPromise;

    if (isFunction(options?.onProgress)) {
      options!.onProgress(data, 1, 'COMPLETE');
    }
  } catch (e) {
    const err = e as Error;
    try {
      streamController.close();
    } catch {
      /* already closed */
    }
    try {
      await Promise.race([
        addPromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('addPromise timeout')), 1000)
        ),
      ]);
    } catch {
      /* swallow — zip entry incomplete */
    }
    throw state.cancelled || err.name === 'AbortError'
      ? new Error('Download cancelled')
      : err;
  }

  return filename;
};

// ─── Post-file Settlement ───

/**
 * Called after each file completes (success or failure).
 * Increments progress and triggers batch cleanup when all files are settled.
 *
 * IMPORTANT: For the final file, this function awaits cleanup completion
 * (zipWriter.close + blob download) before returning. This ensures the
 * user receives the download before useProcessTasks marks the task "done"
 * and the component can unmount.
 */
const onFileSettled = async (
  batchKey: string,
  state: BatchState,
  taskResult: DownloadTaskResult
): Promise<DownloadTaskResult> => {
  state.batchDone++;

  if (state.batchDone < state.batchTotal) {
    return taskResult;
  }

  // Final file — run cleanup synchronously in this promise chain so that
  // the task result is not returned until the download is triggered.
  try {
    if (!state.cancelled && state.zipWriter) {
      await state.zipWriter.close();
      if (state.blobPromise) {
        const blob = await state.blobPromise;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${state.folder}.zip`;
        a.click();
        URL.revokeObjectURL(a.href);
      }
    }
  } catch {
    // zip close failed — batch was likely cancelled
  } finally {
    reset(batchKey, state);
  }

  return taskResult;
};

// ─── Handler ───

/** Main entry point — called once per file in a multi-select download batch. */
export const zipDownloadHandler: DownloadHandler = ({
  config,
  data,
  all,
  options,
}) => {
  const { key } = data;
  const firstKey = all[0]?.key ?? key;
  const folder = getFolderName(firstKey);
  const batchKey = getBatchKey(all);

  const existingBatch = batchMap.get(batchKey);

  // ─── STEP 1: Handle cancelled state ───
  if (existingBatch?.cancelled) {
    existingBatch.batchDone++;
    const result = Promise.resolve<DownloadTaskResult>({
      status: 'CANCELED',
      message: 'Download cancelled',
    });
    if (existingBatch.batchDone >= existingBatch.batchTotal) {
      result.finally(() => reset(batchKey, existingBatch));
    }
    return {
      result,
      cancel: () => {
        /* already cancelled — noop */
      },
    };
  }

  // ─── STEP 2: Initialize zip writer on first file ───
  let currentBatch: BatchState;
  if (!existingBatch) {
    const { readable, writable } = new TransformStream<
      Uint8Array,
      Uint8Array
    >();
    currentBatch = {
      zipWriter: new ZipWriter(writable),
      zipWritable: writable,
      zipReadable: readable,
      downloadId: `${folder}-${Date.now()}.zip`,
      blobPromise: null,
      swReady: Promise.resolve(),
      cancelled: false,
      batchAbort: new AbortController(),
      batchTotal: all.length,
      batchDone: 0,
      keepaliveInterval: null,
      folder,
    };

    batchMap.set(batchKey, currentBatch);
    initServiceWorkerStream(currentBatch);
  } else {
    currentBatch = existingBatch;
  }

  // ─── STEP 3: Normal download ───
  return {
    cancel: () => {
      cancelBatch(batchKey);
    },
    result: download(currentBatch, { config, data, all, options })
      .then((): DownloadTaskResult => ({ status: 'COMPLETE' }))
      .catch((e): DownloadTaskResult => {
        const err = e as Error;
        if (
          err.message === 'Download cancelled' ||
          err.name === 'AbortError' ||
          currentBatch.cancelled
        ) {
          currentBatch.cancelled = true;
          return { status: 'CANCELED', message: 'Download cancelled' };
        }
        return { status: 'FAILED', message: err.message, error: err };
      })
      .then((taskResult) => onFileSettled(batchKey, currentBatch, taskResult)),
  };
};
