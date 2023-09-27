import React from 'react';

import { UploadDataOutput } from '@aws-amplify/storage';
import { isObject } from '@aws-amplify/ui';

import { StorageFiles, FileStatus, DefaultFile } from '../../types';
import { Action, GetFileErrorMessage, UseStorageManagerState } from './types';
import { storageManagerStateReducer } from './reducer';
import {
  addFilesAction,
  clearFilesAction,
  queueFilesAction,
  removeUploadAction,
  setUploadingFileAction,
  setUploadProgressAction,
  setUploadStatusAction,
} from './actions';

export interface UseStorageManager {
  addFiles: (params: {
    files: File[];
    status: FileStatus;
    getFileErrorMessage: GetFileErrorMessage;
  }) => void;
  clearFiles: () => void;
  queueFiles: () => void;
  setUploadingFile: (params: {
    id: string;
    uploadTask?: UploadDataOutput;
  }) => void;
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

export function useStorageManager(
  defaultFiles: Array<DefaultFile> = []
): UseStorageManager {
  const [{ files }, dispatch] = React.useReducer<
    (
      prevState: UseStorageManagerState,
      action: Action
    ) => UseStorageManagerState
  >(storageManagerStateReducer, {
    files: (Array.isArray(defaultFiles)
      ? defaultFiles.map(createFileFromDefault).filter((file) => !!file)
      : []) as StorageFiles,
  });

  const addFiles: UseStorageManager['addFiles'] = ({
    files,
    status,
    getFileErrorMessage,
  }) => {
    dispatch(addFilesAction({ files, status, getFileErrorMessage }));
  };

  const clearFiles: UseStorageManager['clearFiles'] = () => {
    dispatch(clearFilesAction());
  };

  const queueFiles: UseStorageManager['queueFiles'] = () => {
    dispatch(queueFilesAction());
  };

  const setUploadingFile: UseStorageManager['setUploadingFile'] = ({
    uploadTask,
    id,
  }) => {
    dispatch(setUploadingFileAction({ id, uploadTask }));
  };

  const setUploadProgress: UseStorageManager['setUploadProgress'] = ({
    progress,
    id,
  }) => {
    dispatch(setUploadProgressAction({ id, progress }));
  };

  const setUploadSuccess: UseStorageManager['setUploadSuccess'] = ({ id }) => {
    dispatch(setUploadStatusAction({ id, status: FileStatus.UPLOADED }));
  };

  const setUploadPaused: UseStorageManager['setUploadPaused'] = ({ id }) => {
    dispatch(setUploadStatusAction({ id, status: FileStatus.PAUSED }));
  };

  const setUploadResumed: UseStorageManager['setUploadPaused'] = ({ id }) => {
    dispatch(setUploadStatusAction({ id, status: FileStatus.UPLOADING }));
  };

  const removeUpload: UseStorageManager['removeUpload'] = ({ id }) => {
    dispatch(removeUploadAction({ id }));
  };

  return {
    removeUpload,
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
