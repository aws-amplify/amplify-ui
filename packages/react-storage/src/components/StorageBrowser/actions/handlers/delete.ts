import { remove } from '../../storage-internal';

import {
  TaskHandler,
  TaskHandlerOptions,
  TaskHandlerInput,
  TaskHandlerOutput,
} from '../types';

import { constructBucket, resolveHandlerResult } from './utils';

interface DeleteHandlerOptions extends TaskHandlerOptions {}

export interface DeleteHandlerInput
  extends Omit<TaskHandlerInput<never, DeleteHandlerOptions>, 'data'> {
  data: { key: string };
}
export interface DeleteHandlerOutput extends TaskHandlerOutput {}

export interface DeleteHandler
  extends TaskHandler<DeleteHandlerInput, DeleteHandlerOutput> {}

export const deleteHandler: DeleteHandler = ({
  config,
  data: { key },
  prefix,
  options,
}): DeleteHandlerOutput => {
  const { credentials } = config;
  const bucket = constructBucket(config);

  const result = remove({
    path: `${prefix}${key}`,
    options: { bucket, locationCredentialsProvider: credentials },
  });

  return {
    key,
    result: resolveHandlerResult({ key, isCancelable: false, options, result }),
  };
};
