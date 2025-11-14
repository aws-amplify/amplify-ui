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
  console.log('[amplify-ui][delete-folders] deleteObjectsBatch called with:', {
    objectKeysCount: objectKeys.length,
    config,
  });

  // Split into batches of 1000 (AWS limit)
  const batches = [];
  for (let i = 0; i < objectKeys.length; i += BATCH_SIZE) {
    batches.push(objectKeys.slice(i, i + BATCH_SIZE));
  }

  console.log('[amplify-ui][delete-folders] Split into batches:', {
    batchCount: batches.length,
    batchSize: BATCH_SIZE,
  });

  // Process each batch using the new removeObjects API for better performance
  for (const batch of batches) {
    console.log('[amplify-ui][delete-folders] Processing batch:', {
      batchIndex: batches.indexOf(batch),
      batchSize: batch.length,
      batch,
    });

    try {
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

      console.log(
        '[amplify-ui][delete-folders] Calling removeObjects with input:',
        removeObjectsInput
      );
      const result = await removeObjects(removeObjectsInput);
      console.log('[amplify-ui][delete-folders] removeObjects result:', result);

      // Check for any errors in the batch
      if (result.errors.length > 0) {
        console.log(
          '[amplify-ui][delete-folders] Errors found in batch:',
          result.errors
        );
        const errorMessages = result.errors
          .map((e) => `${e.path}: ${e.message}`)
          .join(', ');
        console.error(
          '[amplify-ui][delete-folders] Throwing error for batch failures:',
          errorMessages
        );
        throw new Error(`Failed to delete some objects: ${errorMessages}`);
      }

      console.log(
        '[amplify-ui][delete-folders] Batch processed successfully:',
        {
          deletedCount: result.deleted.length,
        }
      );
    } catch (error) {
      console.error(
        '[amplify-ui][delete-folders] Batch deletion failed, falling back to individual deletions:',
        error
      );

      const { accountId, credentials, customEndpoint } = config;
      const bucket = constructBucket(config);

      console.log('[amplify-ui][delete-folders] Fallback config:', {
        accountId,
        bucket,
        customEndpoint,
      });

      const deletePromises = batch.map((key) => {
        console.log(
          '[amplify-ui][delete-folders] Creating individual delete promise for key:',
          key
        );
        return remove({
          path: key,
          options: {
            bucket,
            locationCredentialsProvider: credentials,
            expectedBucketOwner: accountId,
            customEndpoint,
          },
        });
      });

      console.log(
        '[amplify-ui][delete-folders] Executing individual delete promises:',
        {
          promiseCount: deletePromises.length,
        }
      );
      await Promise.all(deletePromises);
      console.log(
        '[amplify-ui][delete-folders] Individual deletions completed successfully'
      );
    }
  }

  console.log('[amplify-ui][delete-folders] deleteObjectsBatch completed');
};

const deleteFolder = async (
  folderKey: string,
  config: DeleteHandlerInput['config']
): Promise<void> => {
  console.log('[amplify-ui][delete-folders] deleteFolder called with:', {
    folderKey,
    config,
  });

  const { accountId, credentials, customEndpoint } = config;
  const bucket = constructBucket(config);

  console.log('[amplify-ui][delete-folders] Constructed bucket and config:', {
    bucket,
    accountId,
    customEndpoint,
  });

  // List all objects in the folder
  console.log(
    '[amplify-ui][delete-folders] Listing objects in folder:',
    folderKey
  );
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

  console.log('[amplify-ui][delete-folders] List result:', {
    itemCount: listResult.items.length,
    items: listResult.items,
  });

  // Collect all object keys including folder marker
  const objectKeys = listResult.items.map((item) => item.path);
  objectKeys.push(folderKey); // Add folder marker

  console.log('[amplify-ui][delete-folders] Object keys to delete:', {
    totalKeys: objectKeys.length,
    objectKeys,
  });

  // Delete all objects in batches
  console.log('[amplify-ui][delete-folders] Starting batch deletion');
  await deleteObjectsBatch(objectKeys, config);
  console.log(
    '[amplify-ui][delete-folders] deleteFolder completed successfully'
  );
};

export const deleteHandler: DeleteHandler = ({
  config,
  data,
}): DeleteHandlerOutput => {
  console.log('[amplify-ui][delete-folders] deleteHandler called with:', {
    config,
    data,
  });

  const { key, type } = data;
  const isFolder = type === 'FOLDER' || key.endsWith('/');

  console.log('[amplify-ui][delete-folders] Delete operation details:', {
    key,
    type,
    isFolder,
  });

  const result = (
    isFolder
      ? (() => {
          console.log(
            '[amplify-ui][delete-folders] Processing folder deletion'
          );
          return deleteFolder(key, config);
        })()
      : (() => {
          console.log(
            '[amplify-ui][delete-folders] Processing single file deletion'
          );
          const removeInput = {
            path: key,
            options: {
              bucket: constructBucket(config),
              locationCredentialsProvider: config.credentials,
              expectedBucketOwner: config.accountId,
              customEndpoint: config.customEndpoint,
            },
          };
          console.log(
            '[amplify-ui][delete-folders] Single file remove input:',
            removeInput
          );
          return remove(removeInput);
        })()
  )
    .then(() => {
      console.log(
        '[amplify-ui][delete-folders] Delete operation completed successfully for key:',
        key
      );
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

  console.log(
    '[amplify-ui][delete-folders] deleteHandler returning result promise'
  );
  return { result };
};
