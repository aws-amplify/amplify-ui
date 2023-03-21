import React from 'react';
import { v4 as uuid } from 'uuid';

import { UploadTask } from '@aws-amplify/storage';

import { StorageFiles, FileState } from '../../types';

interface UseStorageManagerState {
  files: StorageFiles;
}

enum StorageManagerActionTypes {
  ADD_FILES = 'ADD_FILES',
  SET_UPLOADING = 'SET_UPLOADING',
  SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS',
}

type GetFileErrorMessage = (file: File) => string;

type Action =
  | {
      type: StorageManagerActionTypes.ADD_FILES;
      payload: File[];
      getFileErrorMessage: GetFileErrorMessage;
    }
  | {
      type: StorageManagerActionTypes.SET_UPLOADING;
      id: string;
      uploadTask?: UploadTask;
    }
  | {
      type: StorageManagerActionTypes.SET_UPLOAD_PROGRESS;
      id: string;
      progress: number;
    };

interface AddFilesActionParams {
  files: File[];
  getFileErrorMessage: GetFileErrorMessage;
}
export const addFilesAction = ({
  files,
  getFileErrorMessage,
}: AddFilesActionParams): Action => {
  return {
    type: StorageManagerActionTypes.ADD_FILES,
    payload: files,
    getFileErrorMessage,
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
    type: StorageManagerActionTypes.SET_UPLOADING,
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

function reducer(
  state: UseStorageManagerState,
  action: Action
): UseStorageManagerState {
  switch (action.type) {
    case StorageManagerActionTypes.ADD_FILES: {
      const files = action.payload;

      const newUploads: StorageFiles = files.map((file) => {
        const errorText = action.getFileErrorMessage(file);

        return {
          id: uuid(),
          file,
          error: errorText,
          name: file.name,
          status: errorText ? FileState.ERROR : FileState.READY,
          isImage: file.type.startsWith('image/'),
          progress: -1,
        };
      });

      const newFiles: StorageFiles = [...state.files, ...newUploads];

      return {
        ...state,
        files: newFiles,
      };
    }
    case StorageManagerActionTypes.SET_UPLOADING: {
      const { id, uploadTask } = action;
      const { files } = state;

      const newFiles = files.reduce<StorageFiles>((files, currentFile) => {
        if (currentFile.id === id) {
          return [
            ...files,
            {
              ...currentFile,
              status: FileState.LOADING,
              progress: 0,
              uploadTask: uploadTask ? uploadTask : undefined,
            },
          ];
        }
        return [...files, currentFile];
      }, []);
      return {
        ...state,
        files: newFiles,
      };
    }
    case StorageManagerActionTypes.SET_UPLOAD_PROGRESS: {
      const { id, progress } = action;
      const { files } = state;

      const newFiles = files.reduce<StorageFiles>((files, currentFile) => {
        if (currentFile.id === id) {
          return [
            ...files,
            {
              ...currentFile,
              progress,
            },
          ];
        }
        return [...files, currentFile];
      }, []);
      return {
        ...state,
        files: newFiles,
      };
    }
  }
}

interface UseStorageManager {
  addFiles: (params: {
    files: File[];
    getFileErrorMessage: GetFileErrorMessage;
  }) => void;
  setUploadingFile: (params: { id: string; uploadTask?: UploadTask }) => void;
  setUploadProgress: (params: { id: string; progress: number }) => void;
  files: StorageFiles;
}

export function useStorageManager(
  initialUploads: StorageFiles = []
): UseStorageManager {
  const [{ files }, dispatch] = React.useReducer<
    (
      prevState: UseStorageManagerState,
      action: Action
    ) => UseStorageManagerState
  >(reducer, { files: initialUploads });

  const addFiles: UseStorageManager['addFiles'] = ({
    files,
    getFileErrorMessage,
  }) => {
    dispatch(addFilesAction({ files, getFileErrorMessage }));
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

  return {
    setUploadProgress,
    setUploadingFile,
    addFiles,
    files,
  };
}
