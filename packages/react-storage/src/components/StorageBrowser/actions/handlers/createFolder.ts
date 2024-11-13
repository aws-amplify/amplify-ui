import { uploadData } from '../../storage-internal';
import { isFunction } from '@aws-amplify/ui';

import {
  TaskData,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOutput,
  TaskHandlerOptions,
} from './types';
import { constructBucket, getProgress } from './utils';

export interface CreateFolderHandlerData extends TaskData {}
export interface CreateFolderHandlerOptions extends TaskHandlerOptions {
  preventOverwrite?: boolean;
}

export interface CreateFolderHandlerInput
  extends TaskHandlerInput<
    CreateFolderHandlerData,
    CreateFolderHandlerOptions
  > {
  destinationPrefix: string;
}

export interface CreateFolderHandlerOutput extends TaskHandlerOutput {}

export interface CreateFolderHandler
  extends TaskHandler<CreateFolderHandlerInput, CreateFolderHandlerOutput> {}

export const createFolderHandler: CreateFolderHandler = (input) => {
  const { destinationPrefix, config, data, options } = input;
  const { accountId, credentials, customEndpoint } = config;
  const { onProgress, preventOverwrite } = options ?? {};
  const { key } = data;

  const bucket = constructBucket(config);

  const { result } = uploadData({
    path: `${destinationPrefix}${key}`,
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
      .then(() => ({ status: 'COMPLETE' as const }))
      .catch(({ message, name }: Error) => {
        if (name === 'PreconditionFailed') {
          return { message, status: 'OVERWRITE_PREVENTED' } as const;
        }
        return { message, status: 'FAILED' as const };
      }),
  };
};
