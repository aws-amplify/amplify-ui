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

export const downloadHandler: DownloadHandler = ({
  config,
  data: { key },
  prefix,
  options,
}): DownloadHandlerOutput => {
  const { credentials } = config;
  const bucket = constructBucket(config);

  const result = getUrl({
    path: `${prefix}${key}`,
    options: {
      bucket,
      locationCredentialsProvider: credentials,
      validateObjectExistence: true,
      contentDisposition: 'attachment',
    },
  });

  return {
    key,
    result: resolveHandlerResult({ result, isCancelable: false, key, options }),
  };
};
