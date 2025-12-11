import { getUrl } from '../../storage-internal';
import type { DownloadHandler, DownloadHandlerInput } from './download';
import type { TaskResult, TaskResultStatus } from './types';
import { isFunction } from '@aws-amplify/ui';
import { getProgress } from './utils';
import JSZip from 'jszip';

type DownloadTaskResult = TaskResult<TaskResultStatus, { url: URL }>;

interface MyZipper {
  addFile: (file: Blob, name: string) => Promise<void>;
  getBlobUrl: (
    onProgress?: (percent: number, key: string) => void
  ) => Promise<string>;
}
const zipper: MyZipper = (() => {
  let zip: JSZip | null = null;
  return {
    addFile: (file, name) => {
      if (!zip) {
        zip = new JSZip();
      }
      return new Promise((ok, no) => {
        try {
          zip?.file(name, file);
          ok();
        } catch (e) {
          no();
        }
      });
    },
    getBlobUrl: async (onProgress) => {
      if (!zip) {
        throw new Error('no zip');
      }
      const blob = await zip.generateAsync(
        {
          type: 'blob',
          streamFiles: true,
          compression: 'DEFLATE',
          compressionOptions: {
            level: 3,
          },
        },
        ({ percent, currentFile }) => {
          if (isFunction(onProgress) && currentFile) {
            onProgress(percent, currentFile);
          }
        }
      );
      zip = null;
      return URL.createObjectURL(blob);
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
          })
        );
      }
    }
  }

  return new Blob(chunks);
};

const download = async (
  { config, data, options }: DownloadHandlerInput,
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
  const blob = await readBody(response, { config, data, options });
  const [filename] = key.split('/').reverse();
  await zipper.addFile(blob, filename);
  return filename;
};

const downloadHandler = (() => {
  const fileDownloadQueue = new Set<string>();
  let timer: ReturnType<typeof setTimeout>;

  const handler: DownloadHandler = ({ config, data, options }) => {
    const { key } = data;
    const [, folder] = key.split('/').reverse();
    fileDownloadQueue.add(key);
    const abortController = new AbortController();
    return {
      cancel: () => {
        abortController.abort();
        fileDownloadQueue.delete(key);
      },
      result: download({ config, data, options }, abortController)
        .then((): DownloadTaskResult => {
          fileDownloadQueue.delete(key);
          return {
            status: 'COMPLETE',
          };
        })
        .catch((e): DownloadTaskResult => {
          const error = e as Error;
          fileDownloadQueue.delete(key);
          return {
            status: 'FAILED',
            message: error.message,
            error,
          };
        })
        .finally(() => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            if (fileDownloadQueue.size === 0) {
              zipper.getBlobUrl().then((blobURL) => {
                if (blobURL) {
                  const anchor = document.createElement('a');
                  const clickEvent = new MouseEvent('click');
                  anchor.href = blobURL;
                  anchor.download = `${folder || 'archive'}.zip`;
                  anchor.dispatchEvent(clickEvent);
                }
              });
            }
          }, 250);
        }),
    };
  };

  return handler;
})();

export { downloadHandler as zipDownloadHandler };
