import { FileStatus } from '../../types';

import type { Action, AddFilesActionParams } from './types';
import { FileUploaderActionTypes } from './types';
import type { TaskEvent } from '../../utils';

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

export const setUploadSuccessAction = ({
  id,
  resolvedKey,
}: {
  id: string;
  resolvedKey: string;
}): Action => ({
  type: FileUploaderActionTypes.SET_STATUS_UPLOADED,
  id,
  resolvedKey,
  status: FileStatus.UPLOADED,
});

export const removeUploadAction = ({ id }: { id: string }): Action => ({
  type: FileUploaderActionTypes.REMOVE_UPLOAD,
  id,
});
