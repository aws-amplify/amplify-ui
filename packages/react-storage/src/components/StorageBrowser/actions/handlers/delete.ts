/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-params */
/* eslint-disable no-console */
import { remove, list } from '../../storage-internal';
import { removeMultiple } from '@aws-amplify/storage/s3';

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

const deleteFolder = async (
  folderKey: string,
  config: DeleteHandlerInput['config'],
  onProgress?: (successCount: number | undefined) => void,
  setCancelFn?: (cancelFn: () => void) => void
): Promise<{
  successCount: number;
  failedCount: number;
  failures: Error[];
}> => {
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

  const objectKeys = listResult.items.map((item) => item.path);
  objectKeys.push(folderKey); // Include the folder marker itself

  // Use new removeMultiple API
  const operation = removeMultiple({
    keys: objectKeys.map((key) => ({ key })),
    options: {
      bucket,
      locationCredentialsProvider: config.credentials,
      expectedBucketOwner: config.accountId,
      customEndpoint: config.customEndpoint,
      errorHandling: 'continue', // Continue on individual failures
      batchSize: 10, // Adjust batch size as needed
      onProgress: (progress) => {
        onProgress?.(progress.successCount);
      },
    },
  });

  // Provide cancel function to parent
  setCancelFn?.(operation.cancel);

  const result = await operation.result;

  // Convert failed items to Error objects
  const failures = result.failed.map(
    (item) => new Error(`${item.key}: ${item.error.message}`)
  );

  return {
    successCount: result.summary.successCount,
    failedCount: result.summary.failureCount,
    failures,
  };
};

export const deleteHandler: DeleteHandler = ({
  config,
  data,
  options,
}): DeleteHandlerOutput => {
  const { key, type } = data;
  const { onProgress } = options ?? {};

  const isFolder = type === 'FOLDER' || key.endsWith('/');
  let operationCancel: (() => void) | undefined;

  const cancel = () => {
    operationCancel?.();
  };

  const result = Promise.resolve()
    .then(async () => {
      if (isFolder) {
        const progressCallback = (successCount: number | undefined) => {
          onProgress?.(data, { successCount: successCount });
        };

        const result = await deleteFolder(
          key,
          config,
          progressCallback,
          (cancelFn) => {
            operationCancel = cancelFn;
          }
        );
        return {
          status: 'COMPLETE' as const,
          value: { key },
          successCount: result.successCount,
          failCount: result.failedCount,
          failures: result.failures,
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
          successCount: 1,
          failCount: 0,
        };
      }
    })
    .catch((error: Error) => {
      if (error.message === 'Operation canceled') {
        return {
          status: 'CANCELED' as const,
          message: 'Deletion canceled',
          successCount: 0,
          failCount: 0,
        };
      }
      const { message } = error;
      return {
        error,
        message,
        status: 'FAILED' as const,
        successCount: 0,
        failCount: 1,
      };
    });

  return { result, cancel };
};
