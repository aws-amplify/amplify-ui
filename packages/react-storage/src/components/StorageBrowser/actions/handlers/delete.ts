import { remove } from '../../storage-internal';

import type {
  OptionalFileData,
  TaskHandler,
  TaskHandlerOptions,
  TaskHandlerInput,
  TaskHandlerOutput,
  TaskData,
} from './types';

import { constructBucket } from './utils';

export interface DeleteHandlerOptions extends TaskHandlerOptions {}

export interface DeleteHandlerData extends OptionalFileData, TaskData {
  fileKey: string;
}

export interface DeleteHandlerInput
  extends TaskHandlerInput<DeleteHandlerData, DeleteHandlerOptions> {}

export interface DeleteHandlerOutput
  extends TaskHandlerOutput<{ key: string }> {}

export interface DeleteHandler
  extends TaskHandler<DeleteHandlerInput, DeleteHandlerOutput> {}

export const deleteHandler: DeleteHandler = ({
  config,
  data,
}): DeleteHandlerOutput => {
  const { key } = data;
  const { accountId, credentials, customEndpoint } = config;

  const result = remove({
    path: key,
    options: {
      bucket: constructBucket(config),
      locationCredentialsProvider: credentials,
      expectedBucketOwner: accountId,
      customEndpoint,
    },
  })
    .then(({ path }) => ({
      status: 'COMPLETE' as const,
      value: { key: path },
    }))
    .catch((error: Error) => {
      const { message } = error;
      return { error, message, status: 'FAILED' as const };
    });

  return { result };
};
