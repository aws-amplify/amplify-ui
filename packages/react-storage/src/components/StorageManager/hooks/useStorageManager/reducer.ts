import { FileStatus, StorageFile, StorageFiles } from '../../types';
import {
  Action,
  StorageManagerActionTypes,
  UseStorageManagerState,
} from './types';

const updateFiles = (
  files: StorageFiles,
  nextFileData: Pick<StorageFile, 'id'> & Partial<StorageFile>
) =>
  files.reduce<StorageFiles>((files, currentFile) => {
    if (currentFile.id === nextFileData.id) {
      return [...files, { ...currentFile, ...nextFileData }];
    }
    return [...files, currentFile];
  }, []);

export function storageManagerStateReducer(
  state: UseStorageManagerState,
  action: Action
): UseStorageManagerState {
  switch (action.type) {
    case StorageManagerActionTypes.ADD_FILES: {
      const { files, status } = action;

      const newUploads: StorageFiles = files.map((file) => {
        const errorText = action.getFileErrorMessage(file);

        return {
          // make sure id is unique,
          // we only use it internally and don't send it to Storage
          id: `${Date.now()}-${file.name}`,
          file,
          error: errorText,
          key: file.name,
          status: errorText ? FileStatus.ERROR : status,
          isImage: file.type.startsWith('image/'),
          progress: -1,
        };
      });

      const newFiles: StorageFiles = [...state.files, ...newUploads];

      return { ...state, files: newFiles };
    }
    case StorageManagerActionTypes.CLEAR_FILES: {
      return { ...state, files: [] };
    }
    case StorageManagerActionTypes.QUEUE_FILES: {
      const { files } = state;

      const newFiles = files.reduce<StorageFiles>((files, currentFile) => {
        return [
          ...files,
          {
            ...currentFile,
            ...(currentFile.status === FileStatus.ADDED
              ? { status: FileStatus.QUEUED }
              : {}),
          },
        ];
      }, []);
      return {
        ...state,
        files: newFiles,
      };
    }
    case StorageManagerActionTypes.SET_STATUS_UPLOADING: {
      const { id, uploadTask } = action;
      const status = FileStatus.UPLOADING;
      const progress = 0;
      const nextFileData = { status, progress, id, uploadTask };

      const files = updateFiles(state.files, nextFileData);

      return { ...state, files };
    }
    case StorageManagerActionTypes.SET_PROCESSED_FILE_KEY: {
      const { processedKey, id } = action;
      const files = updateFiles(state.files, { processedKey, id });

      return { files };
    }
    case StorageManagerActionTypes.SET_UPLOAD_PROGRESS: {
      const { id, progress } = action;
      const files = updateFiles(state.files, { id, progress });

      return { ...state, files };
    }
    case StorageManagerActionTypes.SET_STATUS: {
      const { id, status } = action;
      const files = updateFiles(state.files, { id, status });

      return { ...state, files };
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
