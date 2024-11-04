import { getUrl } from '../../storage-internal';
import {
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOptions,
  TaskHandlerOutput,
} from '../types';
import { constructBucket, resolveHandlerResult } from './utils';

interface DownloadHandlerOptions extends TaskHandlerOptions {}
export interface DownloadHandlerInput
  extends TaskHandlerInput<string, DownloadHandlerOptions> {}

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
  key,
  options,
}): DownloadHandlerOutput => {
  const { accountId, credentials } = config;
  const bucket = constructBucket(config);

  const result = getUrl({
    path: key,
    options: {
      bucket,
      locationCredentialsProvider: credentials,
      validateObjectExistence: true,
      contentDisposition: 'attachment',
      expectedBucketOwner: accountId,
    },
  }).then((result) => {
    downloadFromUrl(key, result.url.toString());
    return result;
  });

  return {
    key,
    result: resolveHandlerResult({ result, isCancelable: false, key, options }),
  };
};
