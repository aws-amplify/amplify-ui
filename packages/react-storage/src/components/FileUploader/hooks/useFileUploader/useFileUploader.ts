import React from 'react';

import { isObject } from '@aws-amplify/ui';

import { StorageFiles, FileStatus, DefaultFile } from '../../types';
import { Action, GetFileErrorMessage, UseFileUploaderState } from './types';
import { fileUploaderStateReducer } from './reducer';
import {
  addFilesAction,
  clearFilesAction,
  queueFilesAction,
  removeUploadAction,
  setProcessedKeyAction,
  setUploadingFileAction,
  setUploadProgressAction,
  setUploadStatusAction,
} from './actions';
import { TaskHandler } from '../../utils';

export interface UseFileUploader {
  addFiles: (params: {
    files: File[];
    status: FileStatus;
    getFileErrorMessage: GetFileErrorMessage;
  }) => void;
  clearFiles: () => void;
  queueFiles: () => void;
  setUploadingFile: TaskHandler;
  setProcessedKey: (params: { id: string; processedKey: string }) => void;
  setUploadProgress: (params: { id: string; progress: number }) => void;
  setUploadSuccess: (params: { id: string }) => void;
  setUploadResumed: (params: { id: string }) => void;
  setUploadPaused: (params: { id: string }) => void;
  removeUpload: (params: { id: string }) => void;
  files: StorageFiles;
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
  const [{ files }, dispatch] = React.useReducer<
    (prevState: UseFileUploaderState, action: Action) => UseFileUploaderState
  >(fileUploaderStateReducer, {
    files: (Array.isArray(defaultFiles)
      ? defaultFiles.map(createFileFromDefault).filter((file) => !!file)
      : []) as StorageFiles,
  });

  const addFiles: UseFileUploader['addFiles'] = ({
    files,
    status,
    getFileErrorMessage,
  }) => {
    dispatch(addFilesAction({ files, status, getFileErrorMessage }));
  };

  const clearFiles: UseFileUploader['clearFiles'] = () => {
    dispatch(clearFilesAction());
  };

  const queueFiles: UseFileUploader['queueFiles'] = () => {
    dispatch(queueFilesAction());
  };

  const setUploadingFile: UseFileUploader['setUploadingFile'] = ({
    uploadTask,
    id,
  }) => {
    dispatch(setUploadingFileAction({ id, uploadTask }));
  };

  const setProcessedKey: UseFileUploader['setProcessedKey'] = (input) => {
    dispatch(setProcessedKeyAction(input));
  };

  const setUploadProgress: UseFileUploader['setUploadProgress'] = ({
    progress,
    id,
  }) => {
    dispatch(setUploadProgressAction({ id, progress }));
  };

  const setUploadSuccess: UseFileUploader['setUploadSuccess'] = ({ id }) => {
    dispatch(setUploadStatusAction({ id, status: FileStatus.UPLOADED }));
  };

  const setUploadPaused: UseFileUploader['setUploadPaused'] = ({ id }) => {
    dispatch(setUploadStatusAction({ id, status: FileStatus.PAUSED }));
  };

  const setUploadResumed: UseFileUploader['setUploadPaused'] = ({ id }) => {
    dispatch(setUploadStatusAction({ id, status: FileStatus.UPLOADING }));
  };

  const removeUpload: UseFileUploader['removeUpload'] = ({ id }) => {
    dispatch(removeUploadAction({ id }));
  };

  return {
    removeUpload,
    setProcessedKey,
    setUploadPaused,
    setUploadProgress,
    setUploadResumed,
    setUploadSuccess,
    setUploadingFile,
    queueFiles,
    addFiles,
    clearFiles,
    files,
  };
}
