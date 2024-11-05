import { remove } from '../../storage-internal';

import {
  TaskHandler,
  TaskHandlerOptions,
  TaskHandlerInput,
  TaskHandlerOutput,
  TaskData,
} from '../types';
import { FileData } from './listLocationItems';

import { constructBucket } from './utils';

export interface DeleteHandlerOptions extends TaskHandlerOptions {}

export interface DeleteHandlerData extends TaskData, FileData {}

export interface DeleteHandlerInput
  extends TaskHandlerInput<DeleteHandlerData, DeleteHandlerOptions> {}

export interface DeleteHandlerOutput extends TaskHandlerOutput {}

export interface DeleteHandler
  extends TaskHandler<DeleteHandlerInput, DeleteHandlerOutput> {}

export const deleteHandler: DeleteHandler = ({
  config,
  data: { key },
}): DeleteHandlerOutput => {
  const { accountId, credentials } = config;

  const result = remove({
    path: key,
    options: {
      bucket: constructBucket(config),
      locationCredentialsProvider: credentials,
      expectedBucketOwner: accountId,
    },
  });

  return {
    result: result
      .then(() => ({ status: 'COMPLETE' as const }))
      .catch(({ message }: Error) => ({ message, status: 'FAILED' as const })),
  };
};
