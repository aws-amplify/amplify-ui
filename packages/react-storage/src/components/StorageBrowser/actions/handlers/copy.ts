import { copy } from '../../storage-internal';
import { getFilenameWithoutPrefix } from '../../views/LocationActionView/utils';
import {
  TaskHandler,
  TaskHandlerOptions,
  TaskHandlerInput,
  TaskHandlerOutput,
} from '../types';

import { constructBucket, resolveHandlerResult } from './utils';

interface CopyPayload {
  destinationPrefix: string;
}

export interface CopyHandlerInput
  extends TaskHandlerInput<CopyPayload, TaskHandlerOptions> {}
export interface CopyHandlerOutput extends TaskHandlerOutput {}

export interface CopyHandler
  extends TaskHandler<CopyHandlerInput, CopyHandlerOutput> {}

export const copyHandler: CopyHandler = (input) => {
  const { config, key, options, prefix } = input;
  const { accountId, credentials } = config;

  const sourceKey = key;
  const destinationPath = `${prefix}${getFilenameWithoutPrefix(key)}`;
  const bucket = constructBucket(config);

  const result = copy({
    source: { path: sourceKey, bucket, expectedBucketOwner: accountId },
    destination: {
      path: destinationPath,
      bucket,
      expectedBucketOwner: accountId,
    },
    options: { locationCredentialsProvider: credentials },
  });

  return {
    key,
    result: resolveHandlerResult({ result, key, isCancelable: false, options }),
  };
};
