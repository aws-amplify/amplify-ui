import * as React from 'react';

import { uploadFile } from '@aws-amplify/ui';

import { FileState } from '../../types';

import { StorageManagerProps } from '../../StorageManager/types';
import { UseStorageManager } from '../useStorageManager';

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
      (file) => file.status === FileState.READY
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
        // @TODO: get UploadTask later on
        throw new Error('not implemented yet');
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
      }
      setUploadingFile({ id });

      // dispatch action to save upload task here:
      // dispatch(uploadTask)
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
