import { FileStatus } from '../../types';

import { Action, AddFilesActionParams, FileUploaderActionTypes } from './types';
import { TaskEvent } from '../../utils';

export const addFilesAction = ({
  files,
  status,
  getFileErrorMessage,
}: AddFilesActionParams): Action => ({
  type: FileUploaderActionTypes.ADD_FILES,
  files,
  status,
  getFileErrorMessage,
});

export const clearFilesAction = (): Action => ({
  type: FileUploaderActionTypes.CLEAR_FILES,
});

export const queueFilesAction = (): Action => ({
  type: FileUploaderActionTypes.QUEUE_FILES,
});

export const setProcessedKeyAction = (input: {
  id: string;
  processedKey: string;
}): Action => ({
  ...input,
  type: FileUploaderActionTypes.SET_PROCESSED_FILE_KEY,
});

export const setUploadingFileAction = ({
  id,
  uploadTask,
}: TaskEvent): Action => ({
  type: FileUploaderActionTypes.SET_STATUS_UPLOADING,
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
  type: FileUploaderActionTypes.SET_UPLOAD_PROGRESS,
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
  type: FileUploaderActionTypes.SET_STATUS,
  id,
  status,
});

export const removeUploadAction = ({ id }: { id: string }): Action => ({
  type: FileUploaderActionTypes.REMOVE_UPLOAD,
  id,
});
