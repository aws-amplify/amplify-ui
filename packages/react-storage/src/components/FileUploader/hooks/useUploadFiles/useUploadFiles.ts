import * as React from 'react';

import type { TransferProgressEvent } from 'aws-amplify/storage';
import { isFunction } from '@aws-amplify/ui';

import type { PathCallback } from '../../utils';
import { getInput, uploadFile } from '../../utils';
import type { FileUploaderProps, StorageBucket } from '../../types';
import { FileStatus } from '../../types';
import type { UseFileUploader } from '../useFileUploader';

export interface UseUploadFilesProps
  extends Pick<
      FileUploaderProps,
      | 'isResumable'
      | 'onUploadSuccess'
      | 'onUploadError'
      | 'onUploadStart'
      | 'maxFileCount'
      | 'processFile'
      | 'useAccelerateEndpoint'
    >,
    Pick<
      UseFileUploader,
      'setUploadingFile' | 'setUploadProgress' | 'setUploadSuccess' | 'files'
    > {
  accessLevel?: FileUploaderProps['accessLevel'];
  bucket?: StorageBucket;
  path?: string | PathCallback;
}

export function useUploadFiles({
  accessLevel,
  bucket,
  files,
  isResumable,
  maxFileCount,
  onUploadError,
  onUploadStart,
  onUploadSuccess,
  path,
  processFile,
  setUploadingFile,
  setUploadProgress,
  setUploadSuccess,
  useAccelerateEndpoint,
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
          bucket,
          file,
          key,
          onProgress,
          path,
          processFile,
          useAccelerateEndpoint,
        });

        uploadFile({
          input,
          onComplete: (event) => {
            const resolvedKey =
              (event as { key: string }).key ??
              (event as { path: string }).path;

            if (isFunction(onUploadSuccess)) {
              onUploadSuccess({ key: resolvedKey });
            }
            setUploadSuccess({ id, resolvedKey });
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
    bucket,
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
    useAccelerateEndpoint,
  ]);
}
