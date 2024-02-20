import * as React from 'react';

import { TransferProgressEvent } from 'aws-amplify/storage';
import { isFunction, isString } from '@aws-amplify/ui';

import { uploadFile } from '../../utils/uploadFile';
import { FileStatus } from '../../types';
import { StorageManagerProps } from '../../types';
import { UseStorageManager } from '../useStorageManager';
import { resolveFile } from './resolveFile';

export interface UseUploadFilesProps
  extends Pick<
      StorageManagerProps,
      | 'accessLevel'
      | 'isResumable'
      | 'onUploadSuccess'
      | 'onUploadError'
      | 'onUploadStart'
      | 'maxFileCount'
      | 'processFile'
      | 'path'
    >,
    Pick<
      UseStorageManager,
      'setUploadingFile' | 'setUploadProgress' | 'setUploadSuccess' | 'files'
    > {}

export function useUploadFiles({
  files,
  accessLevel,
  isResumable,
  setUploadProgress,
  setUploadingFile,
  setUploadSuccess,
  onUploadError,
  onUploadSuccess,
  onUploadStart,
  maxFileCount,
  processFile,
  path,
}: UseUploadFilesProps): void {
  React.useEffect(() => {
    const filesReadyToUpload = files.filter(
      (file) => file.status === FileStatus.QUEUED
    );

    if (filesReadyToUpload.length > maxFileCount) {
      return;
    }

    for (const { file, key, id } of filesReadyToUpload) {
      const onComplete: (event: { key?: string }) => void = (event) => {
        if (isFunction(onUploadSuccess)) {
          onUploadSuccess(event);
        }
        setUploadSuccess({ id });
      };

      const onProgress: (event: TransferProgressEvent) => void = (event) => {
        /**
         * When a file is zero bytes, the progress.total will equal zero.
         * Therefore, this will prevent a divide by zero error.
         */
        const progressPercentage =
          event.totalBytes === undefined || event.totalBytes === 0
            ? 100
            : Math.floor((event.transferredBytes / event.totalBytes) * 100);
        setUploadProgress({ id, progress: progressPercentage });
      };

      if (file) {
        resolveFile({ processFile, file, key }).then(
          ({ key: processedKey, ...rest }) => {
            // prepend `path` to `processedKey`
            const resolvedKey = isString(path)
              ? `${path}${processedKey}`
              : processedKey;

            if (isFunction(onUploadStart)) {
              onUploadStart({ key: resolvedKey });
            }

            const uploadTask = uploadFile({
              ...rest,
              key: resolvedKey,
              level: accessLevel,
              progressCallback: onProgress,
              errorCallback: (error: string) => {
                if (isFunction(onUploadError)) {
                  onUploadError(error, { key: resolvedKey });
                }
              },
              completeCallback: onComplete,
            });

            setUploadingFile({ id, uploadTask });
          }
        );
      }
    }
  }, [
    files,
    accessLevel,
    isResumable,
    setUploadProgress,
    setUploadingFile,
    onUploadError,
    onUploadSuccess,
    onUploadStart,
    maxFileCount,
    setUploadSuccess,
    processFile,
    path,
  ]);
}
