import { TaskAction, TaskActionInput, TaskActionOutput } from '../types';
import { remove } from 'aws-amplify/storage';

interface DeleteActionOptions {
  key: string;
}
export interface DeleteActionInput
  extends TaskActionInput<DeleteActionOptions> {}
export interface DeleteActionOutput extends TaskActionOutput {}

export interface DeleteAction
  extends TaskAction<DeleteActionInput, DeleteActionOutput> {}

export const deleteAction: DeleteAction = ({
  config,
  prefix,
}): DeleteActionOutput => {
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
