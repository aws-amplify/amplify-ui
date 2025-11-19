/* eslint-disable max-params */
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

const BATCH_SIZE = 100; // AWS DeleteObjects limit

const deleteObjectsBatch = async (
  objectKeys: string[],
  config: DeleteHandlerInput['config'],
  onProgress?: (deletedCount: number) => void,
  abortSignal?: AbortSignal
): Promise<number> => {
  const batches = [];
  for (let i = 0; i < objectKeys.length; i += BATCH_SIZE) {
    batches.push(objectKeys.slice(i, i + BATCH_SIZE));
  }

  let totalDeleted = 0;

  for (const batch of batches) {
    if (abortSignal?.aborted) {
      throw new Error('Operation canceled');
    }

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

    totalDeleted += result.deleted.length;
    onProgress?.(totalDeleted);

    if (result.errors.length > 0) {
      const errorMessages = result.errors
        .map((e) => `${e.path}: ${e.message}`)
        .join(', ');
      throw new Error(`Failed to delete some objects: ${errorMessages}`);
    }
  }

  return totalDeleted;
};

const deleteFolder = async (
  folderKey: string,
  config: DeleteHandlerInput['config'],
  onProgress?: (deletedCount: number | undefined) => void,
  abortSignal?: AbortSignal
): Promise<number> => {
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

  const objectKeys = listResult.items.map((item) => item.path);
  objectKeys.push(folderKey);

  return await deleteObjectsBatch(objectKeys, config, onProgress, abortSignal);
};

export const deleteHandler: DeleteHandler = ({
  config,
  data,
  options,
}): DeleteHandlerOutput => {
  const { key, type } = data;
  const { onProgress } = options ?? {};

  const isFolder = type === 'FOLDER' || key.endsWith('/');

  // Create AbortController for cancellation
  const abortController = new AbortController();
  let isCanceled = false;

  const cancel = () => {
    isCanceled = true;
    abortController.abort();
  };

  const result = Promise.resolve()
    .then(async () => {
      if (isFolder) {
        const progressCallback = (deletedCount: number | undefined) => {
          if (isCanceled) throw new Error('Operation canceled');
          onProgress?.(data, { deletedCount });
        };

        const deletedCount = await deleteFolder(
          key,
          config,
          progressCallback,
          abortController.signal
        );
        return {
          status: 'COMPLETE' as const,
          value: { key },
          deletedCount,
        };
      } else {
        await remove({
          path: key,
          options: {
            bucket: constructBucket(config),
            locationCredentialsProvider: config.credentials,
            expectedBucketOwner: config.accountId,
            customEndpoint: config.customEndpoint,
          },
        });

        return {
          status: 'COMPLETE' as const,
          value: { key },
        };
      }
    })
    .catch((error: Error) => {
      if (error.message === 'Operation canceled') {
        return { status: 'CANCELED' as const, message: 'Deletion canceled' };
      }
      const { message } = error;
      return { error, message, status: 'FAILED' as const };
    });

  return { result, cancel };
};
