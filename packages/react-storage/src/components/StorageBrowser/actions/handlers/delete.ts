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
}): DeleteHandlerOutput => {
  const { bucket, region, credentials } = config;
  const output = remove({
    path: prefix,
    options: {
      bucket: {
        bucketName: bucket,
        region: region,
      },
      locationCredentialsProvider: credentials,
    },
  });
  return {
    key: prefix,
    result: output
      .then(() => 'COMPLETE' as const)
      .catch(() => 'FAILED' as const),
  };
};
