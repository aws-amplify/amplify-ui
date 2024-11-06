import { getUrl } from '../../storage-internal';
import {
  TaskData,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOptions,
  TaskHandlerOutput,
} from '../types';
import { FileData } from './listLocationItems';
import { constructBucket } from './utils';

export interface DownloadHandlerData extends TaskData, FileData {}
export interface DownloadHandlerOptions extends TaskHandlerOptions {}

export interface DownloadHandlerInput
  extends TaskHandlerInput<DownloadHandlerData, DownloadHandlerOptions> {}

export interface DownloadHandlerOutput extends TaskHandlerOutput {}

export interface DownloadHandler
  extends TaskHandler<DownloadHandlerInput, DownloadHandlerOutput> {}

function downloadFromUrl(fileName: string, url: string) {
  const a = document.createElement('a');

  a.href = url;
  a.download = fileName;

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
}

export const downloadHandler: DownloadHandler = ({
  config,
  data: { key },
}): DownloadHandlerOutput => {
  const { accountId, credentials, customEndpoint } = config;

  const result = getUrl({
    path: key,
    options: {
      bucket: constructBucket(config),
      customEndpoint,
      locationCredentialsProvider: credentials,
      validateObjectExistence: true,
      contentDisposition: 'attachment',
      expectedBucketOwner: accountId,
    },
  }).then((result) => {
    return result;
  });

  return {
    result: result
      .then(({ url }) => {
        downloadFromUrl(key, url.toString());
        return { status: 'COMPLETE' as const };
      })
      .catch(({ message }: Error) => ({ message, status: 'FAILED' as const })),
  };
};
