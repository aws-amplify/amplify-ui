import { isFunction } from '@aws-amplify/ui';
import { uploadData } from '../../storage-internal';

import {
  TaskData,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOutput,
  TaskHandlerOptions,
} from './types';
import { constructBucket, getProgress } from './utils';

export interface CreateFolderHandlerData extends TaskData {
  preventOverwrite?: boolean;
}
export interface CreateFolderHandlerOptions
  extends TaskHandlerOptions<{ key: string }> {}

export interface CreateFolderHandlerInput
  extends TaskHandlerInput<
    CreateFolderHandlerData,
    CreateFolderHandlerOptions
  > {}

export interface CreateFolderHandlerOutput
  extends TaskHandlerOutput<{ key: string }> {}

export interface CreateFolderHandler
  extends TaskHandler<CreateFolderHandlerInput, CreateFolderHandlerOutput> {}

export const createFolderHandler: CreateFolderHandler = (input) => {
  const { config, data, options } = input;
  const { accountId, credentials, customEndpoint } = config;
  const { onProgress } = options ?? {};
  const { key, preventOverwrite } = data;

  const bucket = constructBucket(config);

  const { result } = uploadData({
    path: key,
    data: '',
    options: {
      bucket,
      expectedBucketOwner: accountId,
      locationCredentialsProvider: credentials,
      customEndpoint,
      onProgress: (event) => {
        if (isFunction(onProgress)) onProgress(data, getProgress(event));
      },
      preventOverwrite,
    },
  });

  return {
    result: result
      .then(({ path }) => ({
        status: 'COMPLETE' as const,
        value: { key: path },
      }))
      .catch(({ message, name }: Error) => {
        if (name === 'PreconditionFailed') {
          return { message, status: 'OVERWRITE_PREVENTED' };
        }
        return { message, status: 'FAILED' };
      }),
  };
};
