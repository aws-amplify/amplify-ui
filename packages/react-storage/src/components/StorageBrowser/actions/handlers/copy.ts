import { copy } from '../../storage-internal';
import {
  FileDataItem,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOptions,
  TaskHandlerOutput,
} from './types';

import { constructBucket } from './utils';

export interface CopyHandlerData extends FileDataItem {}

export interface CopyHandlerInput
  extends TaskHandlerInput<CopyHandlerData, TaskHandlerOptions> {
  destinationPrefix: string;
}
export interface CopyHandlerOutput extends TaskHandlerOutput {}

export interface CopyHandler
  extends TaskHandler<CopyHandlerInput, CopyHandlerOutput> {}

export const copyHandler: CopyHandler = (input) => {
  const { config, destinationPrefix: path, data } = input;
  const {
    accountId: expectedBucketOwner,
    credentials,
    customEndpoint,
  } = config;
  const { key: sourcePath, fileKey } = data;

  const bucket = constructBucket(config);

  const destinationPath = `${path}${fileKey}`;
  const source = { bucket, expectedBucketOwner, path: sourcePath };
  const destination = { bucket, expectedBucketOwner, path: destinationPath };

  const result = copy({
    source,
    destination,
    options: { locationCredentialsProvider: credentials, customEndpoint },
  });

  return {
    result: result
      .then(() => ({ status: 'COMPLETE' as const }))
      .catch(({ message }: Error) => ({ message, status: 'FAILED' as const })),
  };
};
