/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-params */
/* eslint-disable no-console */
import { remove, removeMultiple } from '@aws-amplify/storage/s3';

import type {
  TaskHandler,
  TaskHandlerOptions,
  TaskHandlerInput,
  TaskHandlerOutput,
  TaskData,
} from './types';

import { constructBucket } from './utils';
import { list } from '../../storage-internal';

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
      // locationCredentialsProvider: credentials,
      expectedBucketOwner: accountId,
      // customEndpoint,
      listAll: true,
    },
  });

  const objectKeys = listResult.items.map((item) => item.path);
  objectKeys.push(folderKey); // Include the folder marker itself

  // Use new removeMultiple API
  const operation = removeMultiple({
    keys: objectKeys.map((key) => ({ key })),
    options: {
      // @ts-expect-error removeMultiple
      bucket,
      locationCredentialsProvider: config.credentials,
      expectedBucketOwner: config.accountId,
      customEndpoint: config.customEndpoint,
      batchStrategy: 'parallel',
      errorHandling: 'continue', // Continue on individual failures
      batchSize: 10, // Adjust batch size as needed
      maxConcurrency: 3,
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

  let operationCancel: (() => void) | undefined;

  const cancel = () => {
    operationCancel?.();
  };

  const operation = remove({
    path: key,
    options: {
      bucket: constructBucket(config),
      // locationCredentialsProvider: config.credentials,
      expectedBucketOwner: config.accountId,
      // customEndpoint: config.customEndpoint,
      onProgress: (progress) => {
        onProgress?.(data, { successCount: progress.deletedCount });
      },
      batchSize: 1,
    },
  });

  operationCancel = operation.cancel;

  const newResult = operation.result
    .then(({ path }) => {
      return {
        status: 'COMPLETE' as const,
        value: { key: path },
        failCount: 0,
      };
    })
    .catch((error: Error) => {
      const { message } = error;
      return { error, message, status: 'FAILED' as const };
    });

  // const oldResult = remove({
  //   path: key,
  //   options: {
  //     bucket: constructBucket(config),
  //     // locationCredentialsProvider: config.credentials,
  //     expectedBucketOwner: config.accountId,
  //     // customEndpoint: config.customEndpoint,
  //   },
  // })
  //   .then(({ path }) => {
  //     return {
  //       status: 'COMPLETE' as const,
  //       value: { key: path },
  //       failCount: 0,
  //     };
  //   })
  //   .catch((error: Error) => {
  //     const { message } = error;
  //     return { error, message, status: 'FAILED' as const };
  //   });

  return { result: newResult, cancel };
};
