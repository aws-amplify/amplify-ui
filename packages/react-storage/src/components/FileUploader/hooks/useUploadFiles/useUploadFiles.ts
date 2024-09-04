import * as React from 'react';

import { TransferProgressEvent } from 'aws-amplify/storage';
import { isFunction } from '@aws-amplify/ui';

import { PathCallback, uploadFile } from '../../utils';
import { getInput } from '../../utils';
import { FileStatus } from '../../types';
import { FileUploaderProps } from '../../types';
import { UseFileUploader } from '../useFileUploader';

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
  onProcessFileSuccess: (input: { id: string; processedKey: string }) => void;
  path?: string | PathCallback;
}

export function useUploadFiles({
  accessLevel,
  files,
  isResumable,
  maxFileCount,
  onProcessFileSuccess,
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
        const handleProcessFileSuccess = (input: { processedKey: string }) =>
          onProcessFileSuccess({ id, ...input });

        const input = getInput({
          accessLevel,
          file,
          key,
          onProcessFileSuccess: handleProcessFileSuccess,
          onProgress,
          path,
          processFile,
          useAccelerateEndpoint,
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
    onProcessFileSuccess,
    onUploadSuccess,
    onUploadStart,
    maxFileCount,
    setUploadSuccess,
    processFile,
    path,
    useAccelerateEndpoint,
  ]);
}
