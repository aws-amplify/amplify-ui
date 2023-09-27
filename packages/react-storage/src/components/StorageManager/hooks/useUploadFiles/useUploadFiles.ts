import * as React from 'react';
import { TransferProgressEvent } from '@aws-amplify/storage';

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
      | 'provider'
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
  provider,
  path = '',
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
        onUploadSuccess?.(event);
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

      const onError = (error: string) => {
        onUploadError?.(error, { key });
      };

      if (file) {
        resolveFile({ processFile, file, key }).then(({ key, file }) => {
          onUploadStart?.({ key });
          const uploadTask = uploadFile({
            completeCallback: onComplete,
            level: accessLevel,
            progressCallback: onProgress,
            errorCallback: onError,
            file,
            key,
          });
          setUploadingFile({
            id,
            uploadTask: isResumable ? uploadTask : undefined,
          });
        });
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
    provider,
    path,
  ]);
}
