import React from 'react';
import { v4 as uuid } from 'uuid';

import { StorageAccessLevel } from '@aws-amplify/storage';

import { StorageFiles, StorageFile, FileState } from '../../types';

interface UseStorageManagerState {
  files: StorageFiles;
}

enum StorageManagerActionTypes {
  ADD_FILES = 'ADD_FILES',
  UPLOAD_FILES = 'UPLOAD_FILES',
  UPDATE_UPLOAD = 'UPDATE_PROGRESS',
}

type UploadFilesPayload = {
  upload: StorageFile;
  level: StorageAccessLevel;
  onProgress: () => void;
  onComplete: () => void;
  onError: () => void;
};

type Action =
  | {
      type: StorageManagerActionTypes.ADD_FILES;
      payload: File[];
    }
  | {
      type: StorageManagerActionTypes.UPLOAD_FILES;
      payload: UploadFilesPayload[];
    };

export const addFilesAction = (payload: File[]): Action => {
  return {
    type: StorageManagerActionTypes.ADD_FILES,
    payload,
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
        return {
          id: uuid(),
          file,
          name: file.name,
          status: FileState.INIT,
          isImage: false,
          progress: -1,
        };
      });

      const newFiles: StorageFiles = [...state.files, ...newUploads];

      return {
        ...state,
        files: newFiles,
      };
    }
  }
}

interface UseStorageManager {
  addFiles: (files: File[]) => void;
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

  const addFiles = (file: File[]) => {
    dispatch(addFilesAction(file)); //
  };

  return {
    addFiles,
    files,
  };
}
