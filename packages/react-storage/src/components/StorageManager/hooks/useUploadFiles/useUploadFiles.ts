import * as React from 'react';

import { TransferProgressEvent } from 'aws-amplify/storage';
import { isFunction } from '@aws-amplify/ui';

import { PathCallback, uploadFile, getInput } from '../../utils';
import { FileStatus } from '../../types';
import { StorageManagerProps } from '../../types';
import { UseStorageManager } from '../useStorageManager';

export interface UseUploadFilesProps
  extends Pick<
      StorageManagerProps,
      | 'isResumable'
      | 'onUploadSuccess'
      | 'onUploadError'
      | 'onUploadStart'
      | 'maxFileCount'
      | 'processFile'
    >,
    Pick<
      UseStorageManager,
      | 'setUploadingFile'
      | 'setUploadProgress'
      | 'setUploadSuccess'
      | 'files'
      | 'removeUpload'
    > {
  accessLevel?: StorageManagerProps['accessLevel'];
  path?: string | PathCallback;
}

export function useUploadFiles({
  files,
  accessLevel,
  isResumable,
  setUploadProgress,
  setUploadingFile,
  setUploadSuccess,
  onUploadError,
  removeUpload,
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
      const onProgress = (event: TransferProgressEvent): void => {
        /**
         * When a file is zero bytes, the progress.total will equal zero.
         * Therefore, this will prevent a divide by zero error.
         */
        const progress =
          event.totalBytes === undefined || event.totalBytes === 0
            ? 100
            : Math.floor((event.transferredBytes / event.totalBytes) * 100);
        setUploadProgress({ id, progress });
      };

      if (file) {
        const input = getInput({
          accessLevel,
          file,
          key,
          onProgress,
          path,
          processFile,
          id,
          removeUpload,
        });
        uploadFile({
          input,
          onComplete: (event) => {
            if (isFunction(onUploadSuccess)) {
              onUploadSuccess({
                key:
                  (event as { key: string }).key ??
                  (event as { path: string }).path,
              });
            }
            setUploadSuccess({ id });
          },
          onError: ({ key, error }) => {
            if (isFunction(onUploadError)) {
              onUploadError(error.message, { key });
            }
          },
          onStart: ({ key, uploadTask }) => {
            if (isFunction(onUploadStart)) {
              onUploadStart({ key });
            }
            setUploadingFile({ id, uploadTask });
          },
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
    removeUpload,
    onUploadSuccess,
    onUploadStart,
    maxFileCount,
    setUploadSuccess,
    processFile,
    path,
  ]);
}
