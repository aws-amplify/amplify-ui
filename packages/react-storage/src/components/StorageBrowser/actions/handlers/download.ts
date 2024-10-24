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
  extends Omit<TaskHandlerInput<never, DownloadHandlerOptions>, 'data'> {
  data: { key: string };
}
export interface DownloadHandlerOutput extends TaskHandlerOutput {}

export interface DownloadHandler extends TaskHandler<DownloadHandlerInput> {}

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
  prefix,
  options,
}): DownloadHandlerOutput => {
  const { credentials } = config;
  const bucket = constructBucket(config);
  const fileKey = `${prefix}${key}`;

  const result = getUrl({
    path: fileKey,
    options: {
      bucket,
      locationCredentialsProvider: credentials,
      validateObjectExistence: true,
      contentDisposition: 'attachment',
    },
  }).then((result) => {
    downloadFromUrl(fileKey, result.url.toString());
    return result;
  });

  return {
    key,
    result: resolveHandlerResult({ result, isCancelable: false, key, options }),
  };
};
