import React from 'react';
import { nanoid } from 'nanoid';

import { UploadTask } from '@aws-amplify/storage';

import { StorageFiles, FileStatus, DefaultFile } from '../../types';

interface UseStorageManagerState {
  files: StorageFiles;
}

enum StorageManagerActionTypes {
  ADD_FILES = 'ADD_FILES',
  SET_UPLOADING = 'SET_UPLOADING',
  SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS',
  SET_UPLOAD_STATUS = 'SET_UPLOAD_STATUS',
  REMOVE_UPLOAD = 'REMOVE_UPLOAD',
  REMOVE_ALL_UPLOADS = 'REMOVE_UPLOADS',
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
    }
  | {
      type: StorageManagerActionTypes.SET_UPLOAD_STATUS;
      id: string;
      status: FileStatus;
    }
  | {
      type: StorageManagerActionTypes.REMOVE_UPLOAD;
      id: string;
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

export const setUploadStatusAction = ({
  id,
  status,
}: {
  id: string;
  status: FileStatus;
}): Action => {
  return {
    type: StorageManagerActionTypes.SET_UPLOAD_STATUS,
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
          id: nanoid(),
          file,
          error: errorText,
          name: file.name,
          status: errorText ? FileStatus.ERROR : FileStatus.READY,
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
              status: FileStatus.LOADING,
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
    case StorageManagerActionTypes.SET_UPLOAD_STATUS: {
      const { id, status } = action;
      const { files } = state;

      const newFiles = files.reduce<StorageFiles>((files, currentFile) => {
        if (currentFile.id === id) {
          return [
            ...files,
            {
              ...currentFile,
              status,
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
    case StorageManagerActionTypes.REMOVE_UPLOAD: {
      const { id } = action;
      const { files } = state;

      const newFiles = files.reduce<StorageFiles>((files, currentFile) => {
        if (currentFile.id === id) {
          // remove by not returning currentFile
          return [...files];
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

export interface UseStorageManager {
  addFiles: (params: {
    files: File[];
    getFileErrorMessage: GetFileErrorMessage;
  }) => void;
  setUploadingFile: (params: { id: string; uploadTask?: UploadTask }) => void;
  setUploadProgress: (params: { id: string; progress: number }) => void;
  setUploadSuccess: (params: { id: string }) => void;
  setUploadResumed: (params: { id: string }) => void;
  setUploadPaused: (params: { id: string }) => void;
  removeUpload: (params: { id: string }) => void;
  files: StorageFiles;
}

export function useStorageManager(
  defaultFiles: Array<DefaultFile> = []
): UseStorageManager {
  const [{ files }, dispatch] = React.useReducer<
    (
      prevState: UseStorageManagerState,
      action: Action
    ) => UseStorageManagerState
  >(reducer, {
    files: defaultFiles.map((file) => {
      return {
        ...file,
        id: nanoid(),
        name: file.s3Key,
        status: FileStatus.UPLOADED,
      };
    }) as StorageFiles,
  });

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

  const setUploadSuccess: UseStorageManager['setUploadSuccess'] = ({ id }) => {
    dispatch(setUploadStatusAction({ id, status: FileStatus.SUCCESS }));
  };

  const setUploadPaused: UseStorageManager['setUploadPaused'] = ({ id }) => {
    dispatch(setUploadStatusAction({ id, status: FileStatus.PAUSED }));
  };

  const setUploadResumed: UseStorageManager['setUploadPaused'] = ({ id }) => {
    dispatch(setUploadStatusAction({ id, status: FileStatus.LOADING }));
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
    addFiles,
    files,
  };
}
