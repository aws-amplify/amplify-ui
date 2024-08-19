import { uploadData } from 'aws-amplify/storage';

import { TaskAction, TaskActionInput, TaskActionOutput } from '../types';

export interface CreateFolderActionInput
  extends Omit<
    TaskActionInput<never, { reset?: boolean; preventOverwite?: boolean }>,
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
    bucket: bucketName,
    credentialsProvider: locationCredentialsProvider,
    region,
  } = typeof config === 'object' ? config : config();

  let result: CreateFolderActionOutput['result'] | undefined;

  try {
    await uploadData({
      path: prefix,
      data: '',
      options: { bucket: { bucketName, region }, locationCredentialsProvider },
    }).result;
    result = { key: prefix, status: 'SUCCESS', message: undefined };
  } catch (e) {
    result = { key: prefix, status: 'ERROR', message: (e as Error).message };
  }

  return { result };
};
