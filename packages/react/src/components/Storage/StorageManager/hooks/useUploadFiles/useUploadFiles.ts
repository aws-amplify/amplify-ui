import * as React from 'react';

import { uploadFile } from '@aws-amplify/ui';

import { FileStatus } from '../../types';

import { StorageManagerProps } from '../../StorageManager/types';
import { UseStorageManager } from '../useStorageManager';
import { UploadTask } from '@aws-amplify/storage';

export interface UseUploadFilesProps
  extends Pick<
      StorageManagerProps,
      | 'accessLevel'
      | 'isResumable'
      | 'onUploadSuccess'
      | 'onUploadError'
      | 'maxFileCount'
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
  maxFileCount,
}: UseUploadFilesProps): void {
  React.useEffect(() => {
    const filesReadyToUpload = files.filter(
      (file) => file.status === FileStatus.READY
    );

    if (filesReadyToUpload.length > maxFileCount) {
      return;
    }

    for (const { file, name, id } of filesReadyToUpload) {
      const onComplete: (event: { key: string }) => void = (event) => {
        onUploadSuccess?.(event);
        setUploadSuccess({ id });
      };

      const onProgress: (progress: { loaded: number; total: number }) => void =
        (progress) => {
          /**
           * When a file is zero bytes, the progress.total will equal zero.
           * Therefore, this will prevent a divide by zero error.
           */
          const progressPercentage =
            progress.total === 0
              ? 100
              : Math.floor((progress.loaded / progress.total) * 100);
          setUploadProgress({ id, progress: progressPercentage });
        };

      const onError = (error) => {
        onUploadError?.(error); // fixme
      };

      if (isResumable) {
        const uploadTask = uploadFile({
          file,
          fileName: name,
          isResumable: true,
          level: accessLevel,
          completeCallback: onComplete,
          progressCallback: onProgress,
          errorCallback: onError,
        }) as UploadTask; // @todo: fix type returned from uploadFile
        setUploadingFile({ id, uploadTask });
      } else {
        uploadFile({
          file,
          fileName: name,
          isResumable: false,
          level: accessLevel,
          completeCallback: onComplete,
          progressCallback: onProgress,
          errorCallback: onError,
        });
        setUploadingFile({ id });
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
    maxFileCount,
    setUploadSuccess,
  ]);
}
