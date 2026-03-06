import { remove } from '../../storage-internal';

import type {
  TaskHandler,
  TaskHandlerOptions,
  TaskHandlerInput,
  TaskHandlerOutput,
  TaskData,
  OptionalFileData,
} from './types';

import { constructBucket } from './utils';

export interface DeleteHandlerOptions extends TaskHandlerOptions {}

export interface DeleteHandlerData
  extends Omit<OptionalFileData, 'type'>,
    TaskData {
  fileKey?: string;
  type?: 'FILE' | 'FOLDER';
  totalCount?: number | null;
}

export interface DeleteHandlerInput
  extends TaskHandlerInput<DeleteHandlerData, DeleteHandlerOptions> {}

export interface DeleteHandlerOutput
  extends TaskHandlerOutput<{
    key: string;
  }> {}

export interface DeleteHandler
  extends TaskHandler<DeleteHandlerInput, DeleteHandlerOutput> {}

export const deleteHandler: DeleteHandler = ({
  config,
  data,
  options,
}): DeleteHandlerOutput => {
  const { key } = data;
  const { accountId, credentials, customEndpoint } = config;
  const { onProgress } = options ?? {};

  let cumulativeSuccessCount = 0;
  let cumulativeFailureCount = 0;

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
      locationCredentialsProvider: credentials,
      expectedBucketOwner: accountId,
      customEndpoint,
      onProgress: (progress) => {
        if (!progress) {
          return;
        }
        const batchSuccessCount = progress?.deleted?.length ?? 0;
        const batchFailureCount = progress?.failed?.length ?? 0;

        cumulativeSuccessCount += batchSuccessCount;
        cumulativeFailureCount += batchFailureCount;

        onProgress?.(data, {
          successCount: cumulativeSuccessCount,
          failureCount: cumulativeFailureCount,
        });
      },
    },
  });

  operationCancel = operation?.cancel ? operation?.cancel : () => {};

  const operationPromise = operation?.result ?? operation;

  const result = operationPromise
    ?.then?.(({ path }) => {
      return {
        status: 'COMPLETE' as const,
        value: {
          key: path,
          successCount: cumulativeSuccessCount,
          failureCount: cumulativeFailureCount,
        },
      };
    })
    ?.catch?.((error: Error) => {
      const { message } = error;
      return { error, message, status: 'FAILED' as const };
    });

  return { result, cancel };
};
