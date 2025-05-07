import React from 'react';

import { isObject } from '@aws-amplify/ui';

import type { StorageFiles, DefaultFile } from '../../types';
import { FileStatus } from '../../types';
import type { GetFileErrorMessage } from './types';
import { fileUploaderStateReducer } from './reducer';
import {
  addFilesAction,
  clearFilesAction,
  queueFilesAction,
  removeUploadAction,
  setUploadingFileAction,
  setUploadProgressAction,
  setUploadStatusAction,
  setUploadSuccessAction,
} from './actions';
import type { TaskHandler } from '../../utils';

export interface UseFileUploader {
  addFiles: (params: {
    files: File[];
    status: FileStatus;
    getFileErrorMessage: GetFileErrorMessage;
  }) => void;
  clearFiles: () => void;
  files: StorageFiles;
  queueFiles: () => void;
  removeUpload: (params: { id: string }) => void;
  setUploadingFile: TaskHandler;
  setUploadPaused: (params: { id: string }) => void;
  setUploadProgress: (params: { id: string; progress: number }) => void;
  setUploadResumed: (params: { id: string }) => void;
  setUploadSuccess: (params: { id: string; resolvedKey: string }) => void;
}

const isDefaultFile = (file: unknown): file is DefaultFile =>
  !!(isObject(file) && (file as DefaultFile).key);

const createFileFromDefault = (file: DefaultFile) =>
  isDefaultFile(file)
    ? { ...file, id: file.key, status: FileStatus.UPLOADED }
    : undefined;

export function useFileUploader(
  defaultFiles: Array<DefaultFile> = []
): UseFileUploader {
  const [{ files }, dispatch] = React.useReducer(fileUploaderStateReducer, {
    files: (Array.isArray(defaultFiles)
      ? defaultFiles.map(createFileFromDefault).filter((file) => !!file)
      : []) as StorageFiles,
  });

  const dispatchers: Omit<UseFileUploader, 'files'> = React.useMemo(
    () => ({
      addFiles: (params) => {
        dispatch(addFilesAction(params));
      },
      clearFiles: () => {
        dispatch(clearFilesAction());
      },
      queueFiles: () => {
        dispatch(queueFilesAction());
      },
      setUploadingFile: (params) => {
        dispatch(setUploadingFileAction(params));
      },
      setUploadProgress: (params) => {
        dispatch(setUploadProgressAction(params));
      },
      setUploadSuccess: (params) => {
        dispatch(setUploadSuccessAction(params));
      },
      setUploadPaused: ({ id }) => {
        dispatch(setUploadStatusAction({ id, status: FileStatus.PAUSED }));
      },
      setUploadResumed: ({ id }) => {
        dispatch(setUploadStatusAction({ id, status: FileStatus.UPLOADING }));
      },
      removeUpload: ({ id }) => {
        dispatch(removeUploadAction({ id }));
      },
    }),
    []
  );

  return { ...dispatchers, files };
}
