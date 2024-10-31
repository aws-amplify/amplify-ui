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
  extends TaskHandlerInput<string, DeleteHandlerOptions> {}

export interface DeleteHandlerOutput extends TaskHandlerOutput {}

export interface DeleteHandler
  extends TaskHandler<DeleteHandlerInput, DeleteHandlerOutput> {}

export const deleteHandler: DeleteHandler = ({
  config,
  key,
  options,
}): DeleteHandlerOutput => {
  const { accountId, credentials } = config;
  const bucket = constructBucket(config);
  const result = remove({
    path: key,
    options: {
      bucket,
      locationCredentialsProvider: credentials,
      expectedBucketOwner: accountId,
    },
  });

  return {
    key,
    result: resolveHandlerResult({
      key,
      isCancelable: false,
      options,
      result,
    }),
  };
};
