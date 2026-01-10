/* eslint-disable no-console */
import { remove } from '../../storage-internal';

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
  const { key } = data;
  const { onProgress } = options ?? {};

  let operationCancel: (() => void) | undefined = () => {
    // noop
  };

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
