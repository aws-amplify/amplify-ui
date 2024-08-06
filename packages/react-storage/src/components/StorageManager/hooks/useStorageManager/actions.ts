import { FileStatus } from '../../types';

import {
  Action,
  AddFilesActionParams,
  StorageManagerActionTypes,
} from './types';
import { TaskEvent } from '../../utils';

export const addFilesAction = ({
  files,
  status,
  getFileErrorMessage,
}: AddFilesActionParams): Action => ({
  type: StorageManagerActionTypes.ADD_FILES,
  files,
  status,
  getFileErrorMessage,
});

export const clearFilesAction = (): Action => ({
  type: StorageManagerActionTypes.CLEAR_FILES,
});

export const queueFilesAction = (): Action => ({
  type: StorageManagerActionTypes.QUEUE_FILES,
});

export const setProcessedKeyAction = (input: {
  id: string;
  processedKey: string;
}): Action => ({
  ...input,
  type: StorageManagerActionTypes.SET_PROCESSED_FILE_KEY,
});

export const setUploadingFileAction = ({
  id,
  uploadTask,
}: TaskEvent): Action => ({
  type: StorageManagerActionTypes.SET_STATUS_UPLOADING,
  id,
  uploadTask,
});

export const setUploadProgressAction = ({
  id,
  progress,
}: {
  id: string;
  progress: number;
}): Action => ({
  type: StorageManagerActionTypes.SET_UPLOAD_PROGRESS,
  id,
  progress,
});

export const setUploadStatusAction = ({
  id,
  status,
}: {
  id: string;
  status: FileStatus;
}): Action => ({
  type: StorageManagerActionTypes.SET_STATUS,
  id,
  status,
});

export const removeUploadAction = ({ id }: { id: string }): Action => ({
  type: StorageManagerActionTypes.REMOVE_UPLOAD,
  id,
});
