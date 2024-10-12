import { copy } from 'aws-amplify/storage';
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

export const copyHandler: CopyHandler = ({ config, options, prefix, data }) => {
  const { credentials } = config;
  const { payload, key } = data;
  const { destinationPrefix } = payload;

  const sourceKey = `${prefix}${key}`;
  const destinationPath = `${destinationPrefix}${key}`;
  const bucket = constructBucket(config);

  const result = copy({
    source: { path: sourceKey, bucket },
    destination: { path: destinationPath, bucket },
    options: { locationCredentialsProvider: credentials },
  });

  return {
    key,
    result: resolveHandlerResult({ result, key, isCancelable: false, options }),
  };
};
