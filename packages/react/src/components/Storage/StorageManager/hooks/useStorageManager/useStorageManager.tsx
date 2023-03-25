import React from 'react';

import { UploadTask } from '@aws-amplify/storage';

import { StorageFiles, FileStatus, DefaultFile } from '../../types';
import { OnFilesChange } from '../../StorageManager/types';

interface UseStorageManagerState {
  files: StorageFiles;
}

enum StorageManagerActionTypes {
  ADD_FILES = 'ADD_FILES',
  SET_STATUS = 'SET_STATUS',
  SET_STATUS_UPLOADING = 'SET_STATUS_UPLOADING',
  SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS',
  REMOVE_UPLOAD = 'REMOVE_UPLOAD',
}

type GetFileErrorMessage = (file: File) => string;

type Action =
  | {
      type: StorageManagerActionTypes.ADD_FILES;
      files: File[];
      getFileErrorMessage: GetFileErrorMessage;
    }
  | {
      type: StorageManagerActionTypes.SET_STATUS;
      id: string;
      status: FileStatus;
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
    files,
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

function reducer(
  state: UseStorageManagerState,
  action: Action
): UseStorageManagerState {
  switch (action.type) {
    case StorageManagerActionTypes.ADD_FILES: {
      const { files } = action;

      const newUploads: StorageFiles = files.map((file) => {
        const errorText = action.getFileErrorMessage(file);

        return {
          id: file.name,
          file,
          error: errorText,
          name: file.name,
          status: errorText ? FileStatus.ERROR : FileStatus.QUEUED,
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
    case StorageManagerActionTypes.SET_STATUS_UPLOADING: {
      const { id, uploadTask } = action;
      const { files } = state;

      const newFiles = files.reduce<StorageFiles>((files, currentFile) => {
        if (currentFile.id === id) {
          return [
            ...files,
            {
              ...currentFile,
              status: FileStatus.UPLOADING,
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
    case StorageManagerActionTypes.SET_STATUS: {
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

function createReducer(onFilesChange?: OnFilesChange) {
  return function (
    state: UseStorageManagerState,
    action: Action
  ): UseStorageManagerState {
    const newState = reducer(state, action);
    if (
      typeof onFilesChange === 'function' &&
      action.type !== 'SET_UPLOAD_PROGRESS'
    ) {
      onFilesChange(
        newState.files.map(({ file, name, status }) => ({
          file,
          name,
          status,
        }))
      );
    }
    return newState;
  };
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
  defaultFiles: Array<DefaultFile> = [],
  onFilesChange?: OnFilesChange
): UseStorageManager {
  const reducer = React.useMemo(() => {
    return createReducer(onFilesChange);
  }, [onFilesChange]);

  const [{ files }, dispatch] = React.useReducer<
    (
      prevState: UseStorageManagerState,
      action: Action
    ) => UseStorageManagerState
  >(reducer, {
    files: defaultFiles.map((file) => {
      return {
        ...file,
        id: file.s3Key,
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
    addFiles,
    files,
  };
}
