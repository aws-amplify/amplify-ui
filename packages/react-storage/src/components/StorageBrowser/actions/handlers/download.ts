import { getUrl } from '../../storage-internal';
import type {
  TaskData,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOptions,
  TaskHandlerOutput,
} from './types';

import { constructBucket } from './utils';

export interface DownloadHandlerData extends TaskData {
  fileKey: string;
}

export interface DownloadHandlerOptions extends TaskHandlerOptions {}

export interface DownloadHandlerInput
  extends TaskHandlerInput<DownloadHandlerData, DownloadHandlerOptions> {}

export interface DownloadHandlerOutput
  extends TaskHandlerOutput<{ url: URL }> {}

export interface DownloadHandler
  extends TaskHandler<DownloadHandlerInput, DownloadHandlerOutput> {}

function downloadFromUrl(fileName: string, url: string) {
  const a = document.createElement('a');

  a.href = url;
  a.download = fileName;
  a.target = '_blank';
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
  })
    .then(({ url }) => {
      downloadFromUrl(key, url.toString());
      return { status: 'COMPLETE' as const, value: { url } };
    })
    .catch((error: Error) => {
      const { message } = error;
      return { error, message, status: 'FAILED' as const };
    });

  return { result };
};
