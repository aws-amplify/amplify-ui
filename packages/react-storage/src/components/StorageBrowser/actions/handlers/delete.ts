/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-params */
/* eslint-disable no-console */
import { remove } from '@aws-amplify/storage/s3';

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
        onProgress?.(data, { successCount: progress.deleted?.length });
      },
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
