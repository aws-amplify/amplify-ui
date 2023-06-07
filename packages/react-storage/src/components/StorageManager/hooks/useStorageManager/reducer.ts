import { FileStatus, StorageFiles } from '../../types';
import {
  Action,
  StorageManagerActionTypes,
  UseStorageManagerState,
} from './types';

export function storageManagerStateReducer(
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
          key: file.name,
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
    case StorageManagerActionTypes.CLEAR_FILES: {
      return {
        ...state,
        files: [],
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
