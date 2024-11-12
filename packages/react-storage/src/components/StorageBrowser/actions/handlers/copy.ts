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
  const source = {
    bucket,
    expectedBucketOwner,
    /**
     * Per S3 requirement, copy source must the URI encoded.
     * This is NOT added to Amplify JS v6 because it will be a breaking
     * change to suddenly introduce URI encode to copy API source.
     *
     * see: https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html#API_CopyObject_RequestSyntax
     */
    path: sourcePath.split('/').map(encodeURIComponent).join('/'),
  };
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
