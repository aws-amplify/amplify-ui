import { getUrl } from '../../storage-internal';
import type {
  DownloadHandler,
  DownloadHandlerData,
  DownloadHandlerInput,
} from './download';
import type { TaskResult, TaskResultStatus } from './types';
import { isFunction } from '@aws-amplify/ui';
import { getProgress } from './utils';
import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js';

type DownloadTaskResult = TaskResult<TaskResultStatus, { url: URL }>;

interface MyZipper {
  addFile: (
    file: Blob,
    name: string,
    options?: {
      data: DownloadHandlerData;
      signal?: AbortSignal;
      onProgress?: (
        percent: number,
        key: string,
        data: DownloadHandlerData
      ) => void;
    }
  ) => Promise<void>;
  getBlobUrl: () => Promise<string>;
  destroy: () => void;
}

const zipper: MyZipper = (() => {
  let blobWriter: BlobWriter | null = null;
  let zipWriter: ZipWriter<Blob> | null = null;

  return {
    addFile: async (file, name, options) => {
      const { data, signal, onProgress } = options ?? {};
      if (!blobWriter) {
        blobWriter = new BlobWriter('application/zip');
        zipWriter = new ZipWriter(blobWriter);
      }
      await zipWriter!.add(name, new BlobReader(file), {
        level: 0,
        signal,
        onprogress: (progress: number, total: number) => {
          if (isFunction(onProgress) && data) {
            onProgress(progress / total, name, data);
          }
          return undefined;
        },
      });
    },
    getBlobUrl: async () => {
      if (!zipWriter) {
        throw new Error('no zip');
      }
      const blob = await zipWriter.close();
      zipWriter = null;
      blobWriter = null;
      return URL.createObjectURL(blob);
    },
    destroy: () => {
      zipWriter = null;
      blobWriter = null;
    },
  };
})();

const constructBucket = ({
  bucket: bucketName,
  region,
}: DownloadHandlerInput['config']) => ({ bucketName, region });

const readBody = async (
  response: Response,
  { data, options }: DownloadHandlerInput
) => {
  let loading = true;
  const chunks = [];
  const reader = response.body!.getReader();
  const size = +(response.headers.get('content-length') ?? 0);
  let received = 0;
  while (loading) {
    const { value, done } = await reader.read();

    if (done) {
      loading = false;
    } else {
      chunks.push(value);
      received += value.length;
      if (isFunction(options?.onProgress)) {
        options?.onProgress(
          data,
          getProgress({
            totalBytes: size,
            transferredBytes: received,
          }),
          'PENDING'
        );
      }
    }
  }

  return new Blob(chunks);
};

const download = async (
  { config, data, all, options }: DownloadHandlerInput,
  abortController: AbortController
) => {
  const { customEndpoint, credentials, accountId } = config;
  const { key } = data;
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
    signal: abortController.signal,
  });
  const blob = await readBody(response, { config, data, all, options });
  const [filename] = key.split('/').reverse();
  await zipper.addFile(blob, filename, {
    data,
    signal: abortController.signal,
    onProgress: (progress, _name, _data) => {
      if (isFunction(options?.onProgress)) {
        options?.onProgress(
          _data,
          progress,
          progress === 1 ? 'COMPLETE' : 'FINISHING'
        );
      }
    },
  });
  return filename;
};

const downloadHandler = (() => {
  const fileDownloadQueue = new Map<string, boolean>();

  const handler: DownloadHandler = ({ config, data, all, options }) => {
    const { key } = data;
    const [, folder] = key.split('/').reverse();
    fileDownloadQueue.set(key, false);
    const abortController = new AbortController();
    return {
      cancel: () => {
        abortController.abort();
        fileDownloadQueue.set(key, true);
      },
      result: download({ config, data, all, options }, abortController)
        .then((): DownloadTaskResult => {
          fileDownloadQueue.set(key, true);
          return {
            status: 'COMPLETE' as const,
          };
        })
        .catch((e): DownloadTaskResult => {
          const error = e as Error;
          fileDownloadQueue.set(key, true);
          return {
            status: 'FAILED',
            message: error.message,
            error,
          };
        })
        .finally(() => {
          const done = all.every(({ key }) => {
            return fileDownloadQueue.get(key);
          });
          if (done) {
            zipper
              .getBlobUrl()
              .then((blobURL) => {
                if (blobURL) {
                  zipper.destroy();
                  const anchor = document.createElement('a');
                  const clickEvent = new MouseEvent('click');
                  anchor.href = blobURL;
                  anchor.download = `${folder || 'archive'}.zip`;
                  anchor.dispatchEvent(clickEvent);
                }
              })
              .catch(() => {
                // this catch happens, when no zip was created.
                // it is handled by the UI showing "FAILED" for all files
              });
          }
        }),
    };
  };

  return handler;
})();

export { downloadHandler as zipDownloadHandler };
