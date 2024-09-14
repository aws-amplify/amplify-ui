import { FileStatus, StorageFiles } from '../../types';
import { UploadTask } from '../../utils';

export interface UseFileUploaderState {
  files: StorageFiles;
}

export enum FileUploaderActionTypes {
  ADD_FILES = 'ADD_FILES',
  CLEAR_FILES = 'CLEAR_FILES',
  QUEUE_FILES = 'QUEUE_FILES',
  SET_STATUS = 'SET_STATUS',
  SET_PROCESSED_FILE_KEY = 'SET_PROCESSED_FILE_KEY',
  SET_STATUS_UPLOADING = 'SET_STATUS_UPLOADING',
  SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS',
  REMOVE_UPLOAD = 'REMOVE_UPLOAD',
}

export type GetFileErrorMessage = (file: File) => string;

export type Action =
  | {
      type: FileUploaderActionTypes.ADD_FILES;
      files: File[];
      status: FileStatus;
      getFileErrorMessage: GetFileErrorMessage;
    }
  | {
      type: FileUploaderActionTypes.CLEAR_FILES;
    }
  | {
      type: FileUploaderActionTypes.SET_STATUS;
      id: string;
      status: FileStatus;
    }
  | {
      type: FileUploaderActionTypes.QUEUE_FILES;
    }
  | {
      type: FileUploaderActionTypes.SET_STATUS_UPLOADING;
      id: string;
      uploadTask?: UploadTask;
    }
  | {
      type: FileUploaderActionTypes.SET_UPLOAD_PROGRESS;
      id: string;
      progress: number;
    }
  | {
      type: FileUploaderActionTypes.SET_PROCESSED_FILE_KEY;
      id: string;
      processedKey: string;
    }
  | {
      type: FileUploaderActionTypes.REMOVE_UPLOAD;
      id: string;
    };

export interface AddFilesActionParams {
  files: File[];
  status: FileStatus;
  getFileErrorMessage: GetFileErrorMessage;
}
