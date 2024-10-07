import { remove } from 'aws-amplify/storage';

import { TaskHandler, TaskHandlerInput, TaskHandlerOutput } from '../types';

interface DeleteHandlerOptions {
  key: string;
}
export interface DeleteHandlerInput
  extends TaskHandlerInput<DeleteHandlerOptions> {}
export interface DeleteHandlerOutput extends TaskHandlerOutput {}

export interface DeleteHandler
  extends TaskHandler<DeleteHandlerInput, DeleteHandlerOutput> {}

export const deleteHandler: DeleteHandler = ({
  config,
  prefix,
  data,
}): DeleteHandlerOutput => {
  const { bucket, region, credentials } = config;
  const { key } = data;
  const fullPath = `${prefix}${key}`;
  const output = remove({
    path: fullPath,
    options: {
      bucket: {
        bucketName: bucket,
        region: region,
      },
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
