import { getUrl } from '../../storage-internal';
import type {
  DownloadHandler,
  DownloadHandlerData,
  DownloadHandlerInput,
} from './download';
import type { TaskResult, TaskResultStatus } from './types';
import { isFunction } from '@aws-amplify/ui';
import { getProgress } from './utils';
import JSZip from 'jszip';

type DownloadTaskResult = TaskResult<TaskResultStatus, { url: URL }>;

interface MyZipper {
  addFile: (
    file: Blob,
    name: string,
    data: DownloadHandlerData
  ) => Promise<void>;
  getBlobUrl: (
    onProgress?: (
      percent: number,
      key: string,
      data: DownloadHandlerData
    ) => void
  ) => Promise<string>;
  destroy: () => void;
}

const zipProgressManager = ({
  dataMap,
  onZipProgress,
}: {
  dataMap: Map<string, DownloadHandlerData>;
  onZipProgress: (
    file: string,
    progress: number,
    data: DownloadHandlerData
  ) => void;
}) => {
  const iter = (() => {
    let f: string;
    let i = 0;
    return (str: string) => {
      if (!f) {
        f = str;
      } else if (str !== f) {
        ++i;
        f = str;
      }
      return i;
    };
  })();
  const progressMap = new Map<string, number>(
    Array.from(dataMap.keys()).map((k) => [k, 0])
  );
  const total = dataMap.size;
  dataMap.forEach((data, key) => {
    onZipProgress(key, 0, data);
  });
  return ({
    percent,
    currentFile,
  }: {
    percent: number;
    currentFile: string | null;
  }) => {
    if (currentFile) {
      const item = iter(currentFile);
      const sliceSize = 100 / total; // when 3 this is 33.3%
      const start = sliceSize * item; // this is 66.6% for last item of 3;
      // take percent and calculate the percent of the slice
      const progress = percent - start;
      const actualPercent = (progress / sliceSize) * 100;
      progressMap.set(
        currentFile,
        Math.max(actualPercent, progressMap.get(currentFile) ?? 0)
      );
      onZipProgress(
        currentFile,
        progressMap.get(currentFile) as number,
        dataMap.get(currentFile) as DownloadHandlerData
      );
    }
  };
};
const zipper: MyZipper = (() => {
  let zip: JSZip | null = null;
  const dataMap = new Map<string, DownloadHandlerData>();
  return {
    addFile: (file, name, data) => {
      if (!zip) {
        zip = new JSZip();
      }
      dataMap.set(name, data);
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
            level: 5,
          },
        },
        zipProgressManager({
          dataMap,
          onZipProgress: (file, progress, data) => {
            if (isFunction(onProgress)) {
              onProgress(progress, file, data);
            }
          },
        })
      );
      zip = null;
      return URL.createObjectURL(blob);
    },
    destroy: () => {
      dataMap.clear();
      zip = null;
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
  await zipper.addFile(blob, filename, data);
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
            status: 'LOADED',
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
              .getBlobUrl((percent, name, _data) => {
                if (isFunction(options?.onProgress)) {
                  const progress = percent / 100;
                  options?.onProgress(
                    _data,
                    progress,
                    progress === 1 ? 'COMPLETE' : 'FINISHING'
                  );
                }
              })
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
