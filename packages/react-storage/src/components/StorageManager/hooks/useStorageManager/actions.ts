import { UploadTask } from '@aws-amplify/storage';
import { FileStatus } from '../../types';

import {
  Action,
  AddFilesActionParams,
  StorageManagerActionTypes,
} from './types';

export const addFilesAction = ({
  files,
  getFileErrorMessage,
}: AddFilesActionParams): Action => {
  return {
    type: StorageManagerActionTypes.ADD_FILES,
    files,
    getFileErrorMessage,
  };
};

export const clearFilesAction = (): Action => {
  return {
    type: StorageManagerActionTypes.CLEAR_FILES,
  };
};

export const setUploadingFileAction = ({
  id,
  uploadTask,
}: {
  id: string;
  uploadTask: UploadTask | undefined;
}): Action => {
  return {
    type: StorageManagerActionTypes.SET_STATUS_UPLOADING,
    id,
    uploadTask,
  };
};

export const setUploadProgressAction = ({
  id,
  progress,
}: {
  id: string;
  progress: number;
}): Action => {
  return {
    type: StorageManagerActionTypes.SET_UPLOAD_PROGRESS,
    id,
    progress,
  };
};

export const setUploadStatusAction = ({
  id,
  status,
}: {
  id: string;
  status: FileStatus;
}): Action => {
  return {
    type: StorageManagerActionTypes.SET_STATUS,
    id,
    status,
  };
};

export const removeUploadAction = ({ id }: { id: string }): Action => {
  return {
    type: StorageManagerActionTypes.REMOVE_UPLOAD,
    id,
  };
};
