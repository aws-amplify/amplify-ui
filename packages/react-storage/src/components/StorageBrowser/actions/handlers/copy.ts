import type { CopyInput } from '../../storage-internal';
import { copy } from '../../storage-internal';
import type {
  OptionalFileData,
  TaskData,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOptions,
  TaskHandlerOutput,
} from './types';

import { constructBucket } from './utils';

export interface CopyHandlerData extends OptionalFileData, TaskData {
  fileKey: string;
  lastModified: Date;
  sourceKey: string;
}

export interface CopyHandlerInput
  extends TaskHandlerInput<CopyHandlerData, TaskHandlerOptions> {}

export interface CopyHandlerOutput extends TaskHandlerOutput<{ key: string }> {}

export interface CopyHandler
  extends TaskHandler<CopyHandlerInput, CopyHandlerOutput> {}

export const copyHandler: CopyHandler = (input) => {
  const { config, data } = input;
  const {
    accountId: expectedBucketOwner,
    credentials,
    customEndpoint,
  } = config;

  const { key, sourceKey, lastModified, eTag } = data;

  const bucket = constructBucket(config);

  const source: CopyInput['source'] = {
    bucket,
    expectedBucketOwner,
    // Per S3 requirement, copy source must the URI encoded.
    // This is NOT added to Amplify JS v6 because it will be a breaking
    // change to suddenly introduce URI encode to copy API source.
    //
    // see: https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html#API_CopyObject_RequestSyntax
    path: sourceKey.split('/').map(encodeURIComponent).join('/'),
    notModifiedSince: lastModified,
    eTag,
  };

  const destination: CopyInput['destination'] = {
    bucket,
    expectedBucketOwner,
    path: key,
  };

  const result = copy({
    source,
    destination,
    options: { locationCredentialsProvider: credentials, customEndpoint },
  });

  return {
    result: result
      .then(({ path }) => ({
        status: 'COMPLETE' as const,
        value: { key: path },
      }))
      .catch((error: Error) => {
        const { message } = error;
        return { error, message, status: 'FAILED' };
      }),
  };
};
