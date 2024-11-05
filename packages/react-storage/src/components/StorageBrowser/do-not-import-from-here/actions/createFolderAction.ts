import { uploadData } from '../../storage-internal';

import { TaskAction, TaskActionInput, TaskActionOutput } from '../types';

export interface CreateFolderActionInput
  extends Omit<
    TaskActionInput<{ reset?: boolean; preventOverwrite?: boolean }>,
    'data'
  > {}

export interface CreateFolderActionInputV2
  extends Omit<
    TaskActionInput<{ reset?: boolean; preventOverwrite?: boolean }>,
    'data'
  > {}

export interface CreateFolderActionOutput extends TaskActionOutput {}

export interface CreateFolderAction
  extends TaskAction<CreateFolderActionInput, CreateFolderActionOutput> {}

export const createFolderAction = async (
  _: CreateFolderActionOutput,
  input: CreateFolderActionInput
): Promise<CreateFolderActionOutput> => {
  const { prefix, config, options } = input;

  if (options?.reset) {
    return { result: undefined };
  }

  const {
    accountId: expectedBucketOwner,
    bucket: bucketName,
    credentialsProvider: locationCredentialsProvider,
    region,
  } = typeof config === 'object' ? config : config();

  let result: CreateFolderActionOutput['result'] | undefined;

  try {
    await uploadData({
      path: prefix,
      data: '',
      options: {
        bucket: { bucketName, region },
        expectedBucketOwner,
        locationCredentialsProvider,
      },
    }).result;
    result = { key: prefix, status: 'COMPLETE', message: undefined };
  } catch (e) {
    result = { key: prefix, status: 'FAILED', message: (e as Error).message };
  }

  return { result };
};
