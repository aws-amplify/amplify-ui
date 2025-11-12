import { remove, list, removeObjects } from '../../storage-internal';

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
  // Split into batches of 1000 (AWS limit)
  const batches = [];
  for (let i = 0; i < objectKeys.length; i += BATCH_SIZE) {
    batches.push(objectKeys.slice(i, i + BATCH_SIZE));
  }

  // Process each batch using the new removeObjects API for better performance
  for (const batch of batches) {
    try {
      // Try to import removeObjects directly from the storage package

      const result = await removeObjects({
        paths: batch,
        options: {
          expectedBucketOwner: config.accountId,
        },
      });

      // Check for any errors in the batch
      if (result.errors.length > 0) {
        const errorMessages = result.errors
          .map((e) => `${e.path}: ${e.message}`)
          .join(', ');
        throw new Error(`Failed to delete some objects: ${errorMessages}`);
      }
    } catch (error) {
      // Fallback to individual deletions if batch API is not available or fails
      console.warn(
        'Batch deletion failed, falling back to individual deletions:',
        error
      );

      const { accountId, credentials, customEndpoint } = config;
      const bucket = constructBucket(config);

      const deletePromises = batch.map((key) =>
        remove({
          path: key,
          options: {
            bucket,
            locationCredentialsProvider: credentials,
            expectedBucketOwner: accountId,
            customEndpoint,
          },
        })
      );

      await Promise.all(deletePromises);
    }
  }
};

const deleteFolder = async (
  folderKey: string,
  config: DeleteHandlerInput['config']
): Promise<void> => {
  const { accountId, credentials, customEndpoint } = config;
  const bucket = constructBucket(config);

  // List all objects in the folder
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
      ? deleteFolder(key, config)
      : remove({
          path: key,
          options: {
            bucket: constructBucket(config),
            locationCredentialsProvider: config.credentials,
            expectedBucketOwner: config.accountId,
            customEndpoint: config.customEndpoint,
          },
        })
  )
    .then(() => ({
      status: 'COMPLETE' as const,
      value: { key },
    }))
    .catch((error: Error) => {
      const { message } = error;
      return { error, message, status: 'FAILED' as const };
    });

  return { result };
};
