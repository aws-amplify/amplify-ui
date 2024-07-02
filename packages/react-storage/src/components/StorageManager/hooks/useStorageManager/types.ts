import { FileStatus, StorageFiles } from '../../types';
import { UploadTask } from '../../utils';

export interface UseStorageManagerState {
  files: StorageFiles;
}

export enum StorageManagerActionTypes {
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
      type: StorageManagerActionTypes.ADD_FILES;
      files: File[];
      status: FileStatus;
      getFileErrorMessage: GetFileErrorMessage;
    }
  | {
      type: StorageManagerActionTypes.CLEAR_FILES;
    }
  | {
      type: StorageManagerActionTypes.SET_STATUS;
      id: string;
      status: FileStatus;
    }
  | {
      type: StorageManagerActionTypes.QUEUE_FILES;
    }
  | {
      type: StorageManagerActionTypes.SET_STATUS_UPLOADING;
      id: string;
      uploadTask?: UploadTask;
    }
  | {
      type: StorageManagerActionTypes.SET_UPLOAD_PROGRESS;
      id: string;
      progress: number;
    }
  | {
      type: StorageManagerActionTypes.SET_PROCESSED_FILE_KEY;
      id: string;
      processedKey: string;
    }
  | {
      type: StorageManagerActionTypes.REMOVE_UPLOAD;
      id: string;
    };

export interface AddFilesActionParams {
  files: File[];
  status: FileStatus;
  getFileErrorMessage: GetFileErrorMessage;
}
