import * as React from 'react';
import type { UploadTask } from '@aws-amplify/storage';

import { uploadFile } from '../../utils/uploadFile';

import { FileStatus, isProcessedFile } from '../../types';

import { StorageManagerProps } from '../../types';
import { UseStorageManager } from '../useStorageManager';
import { isFunction } from '@aws-amplify/ui';

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

      const onError = (error: string) => {
        onUploadError?.(error, { key });
      };

      if (file) {
        const processedFile = isFunction(processFile)
          ? processFile({ file, key })
          : { file, key };

        // processFile can return a Promise or immediately return the processed file
        // if it is a processed file, start the upload
        if (isProcessedFile(processedFile)) {
          const { file, key, ...processedRest } = processedFile;
          onUploadStart?.({ key });
          if (isResumable) {
            const uploadTask = uploadFile({
              ...processedRest,
              file,
              fileName: path + key,
              isResumable: true,
              level: accessLevel,
              completeCallback: onComplete,
              progressCallback: onProgress,
              errorCallback: onError,
              provider,
            }) as unknown as UploadTask;
            setUploadingFile({ id, uploadTask });
          } else {
            uploadFile({
              ...processedRest,
              file,
              fileName: path + key,
              isResumable: false,
              level: accessLevel,
              completeCallback: onComplete,
              progressCallback: onProgress,
              errorCallback: onError,
              provider,
            });
            setUploadingFile({ id });
          }
        } else {
          // processedFile is a Promise, resolve it first,
          // then start the upload
          processedFile.then(({ file, key, ...rest }) => {
            onUploadStart?.({ key });
            if (isResumable) {
              const uploadTask = uploadFile({
                ...rest,
                file,
                fileName: path + key,
                isResumable: true,
                level: accessLevel,
                completeCallback: onComplete,
                progressCallback: onProgress,
                errorCallback: onError,
                provider,
              }) as unknown as UploadTask;
              setUploadingFile({ id, uploadTask });
            } else {
              uploadFile({
                ...rest,
                file,
                fileName: path + key,
                isResumable: false,
                level: accessLevel,
                completeCallback: onComplete,
                progressCallback: onProgress,
                errorCallback: onError,
                provider,
              });
              setUploadingFile({ id });
            }
          });
        }
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
