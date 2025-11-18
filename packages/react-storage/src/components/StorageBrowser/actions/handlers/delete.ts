/* eslint-disable no-console */
import { remove, list } from '../../storage-internal';
import { removeObjects } from '@aws-amplify/storage/internals';
import type { RemoveObjectsInput } from '@aws-amplify/storage/internals';

import type {
  TaskHandler,
  TaskHandlerOptions,
  TaskHandlerInput,
  TaskHandlerOutput,
  TaskData,
} from './types';

import { constructBucket } from './utils';

export interface DeleteHandlerOptions extends TaskHandlerOptions {}

export interface DeleteHandlerData extends TaskData {
  fileKey: string;
  type?: 'FILE' | 'FOLDER';
}

export interface DeleteHandlerInput
  extends TaskHandlerInput<DeleteHandlerData, DeleteHandlerOptions> {}

export interface DeleteHandlerOutput
  extends TaskHandlerOutput<{ key: string }> {}

export interface DeleteHandler
  extends TaskHandler<DeleteHandlerInput, DeleteHandlerOutput> {}

const BATCH_SIZE = 1000; // AWS DeleteObjects limit

const deleteObjectsBatch = async (
  objectKeys: string[],
  config: DeleteHandlerInput['config']
): Promise<void> => {
  const batches = [];
  for (let i = 0; i < objectKeys.length; i += BATCH_SIZE) {
    batches.push(objectKeys.slice(i, i + BATCH_SIZE));
  }

  for (const batch of batches) {
    //@ts-expect-error RemoveObjectsInput is not fully typed yet
    const removeObjectsInput: RemoveObjectsInput = {
      paths: batch,
      options: {
        bucket: constructBucket(config),
        locationCredentialsProvider: config.credentials,
        expectedBucketOwner: config.accountId,
        customEndpoint: config.customEndpoint,
      },
    };

    const result = await removeObjects(removeObjectsInput);

    if (result.errors.length > 0) {
      const errorMessages = result.errors
        .map((e) => `${e.path}: ${e.message}`)
        .join(', ');
      throw new Error(`Failed to delete some objects: ${errorMessages}`);
    }
  }
};

const deleteFolder = async (
  folderKey: string,
  config: DeleteHandlerInput['config']
): Promise<void> => {
  const { accountId, credentials, customEndpoint } = config;
  const bucket = constructBucket(config);

  const listResult = await list({
    path: folderKey,
    options: {
      bucket,
      locationCredentialsProvider: credentials,
      expectedBucketOwner: accountId,
      customEndpoint,
      listAll: true,
    },
  });

  // Collect all object keys including folder marker
  const objectKeys = listResult.items.map((item) => item.path);
  objectKeys.push(folderKey); // Add folder marker

  // Delete all objects in batches
  await deleteObjectsBatch(objectKeys, config);
};

export const deleteHandler: DeleteHandler = ({
  config,
  data,
}): DeleteHandlerOutput => {
  const { key, type } = data;
  const isFolder = type === 'FOLDER' || key.endsWith('/');

  const result = (
    isFolder
      ? (() => {
          return deleteFolder(key, config);
        })()
      : (() => {
          const removeInput = {
            path: key,
            options: {
              bucket: constructBucket(config),
              locationCredentialsProvider: config.credentials,
              expectedBucketOwner: config.accountId,
              customEndpoint: config.customEndpoint,
            },
          };

          return remove(removeInput);
        })()
  )
    .then(() => {
      return {
        status: 'COMPLETE' as const,
        value: { key },
      };
    })
    .catch((error: Error) => {
      console.error(
        '[amplify-ui][delete-folders] Delete operation failed for key:',
        key,
        'Error:',
        error
      );
      const { message } = error;
      return { error, message, status: 'FAILED' as const };
    });

  return { result };
};
