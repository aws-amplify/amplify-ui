import { copy } from '../../storage-internal';
import {
  TaskHandler,
  TaskHandlerInput,
  TaskData,
  TaskHandlerOptions,
  TaskHandlerOutput,
} from '../types';
import { FileData } from './listLocationItems';

import { constructBucket } from './utils';

export interface CopyHandlerData extends TaskData, FileData {}

export interface CopyHandlerInput
  extends TaskHandlerInput<CopyHandlerData, TaskHandlerOptions> {
  destinationPrefix: string;
}
export interface CopyHandlerOutput extends TaskHandlerOutput {}

export interface CopyHandler
  extends TaskHandler<CopyHandlerInput, CopyHandlerOutput> {}

export const copyHandler: CopyHandler = (input) => {
  const { config, destinationPrefix: path, data } = input;
  const { accountId: expectedBucketOwner, credentials } = config;
  const { key: sourcePath } = data;

  const bucket = constructBucket(config);

  const source = { bucket, expectedBucketOwner, path: sourcePath };
  const destination = { bucket, expectedBucketOwner, path };

  const result = copy({
    source,
    destination,
    options: { locationCredentialsProvider: credentials },
  });

  return {
    result: result
      .then(() => ({ status: 'COMPLETE' as const }))
      .catch(({ message }: Error) => ({ message, status: 'FAILED' as const })),
  };
};
