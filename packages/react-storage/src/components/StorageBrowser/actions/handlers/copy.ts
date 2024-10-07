import { copy } from 'aws-amplify/storage';
import { TaskHandler, TaskHandlerInput, TaskHandlerOutput } from '../types';

interface CopyData {
  destinationPrefix: string;
  key: string;
}

export interface CopyHandlerInput extends TaskHandlerInput<CopyData> {}
export interface CopyHandlerOutput extends TaskHandlerOutput {}

export interface CopyHandler
  extends TaskHandler<CopyHandlerInput, CopyHandlerOutput> {}

export const copyHandler: CopyHandler = ({ config, prefix, data }) => {
  const { bucket, region, credentials } = config;
  const { destinationPrefix, key } = data;
  const fullPath = `${destinationPrefix}${key}`;
  const output = copy({
    source: {
      path: `${prefix}${key}`,
      bucket: {
        bucketName: bucket,
        region: region,
      },
    },
    destination: {
      path: fullPath,
      bucket: {
        bucketName: bucket,
        region: region,
      },
    },
    options: {
      locationCredentialsProvider: credentials,
    },
  });

  return {
    key: fullPath,
    result: output
      .then(() => 'COMPLETE' as const)
      .catch(() => 'FAILED' as const),
  };
};
