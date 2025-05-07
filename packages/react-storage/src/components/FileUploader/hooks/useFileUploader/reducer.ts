import type { StorageFile, StorageFiles } from '../../types';
import { FileStatus } from '../../types';
import type { Action, UseFileUploaderState } from './types';
import { FileUploaderActionTypes } from './types';

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

export function fileUploaderStateReducer(
  state: UseFileUploaderState,
  action: Action
): UseFileUploaderState {
  switch (action.type) {
    case FileUploaderActionTypes.ADD_FILES: {
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
    case FileUploaderActionTypes.CLEAR_FILES: {
      return { ...state, files: [] };
    }
    case FileUploaderActionTypes.QUEUE_FILES: {
      const { files } = state;

      const newFiles = files.reduce<StorageFiles>(
        (files, currentFile) => [
          ...files,
          {
            ...currentFile,
            ...(currentFile.status === FileStatus.ADDED
              ? { status: FileStatus.QUEUED }
              : {}),
          },
        ],
        []
      );
      return { ...state, files: newFiles };
    }
    case FileUploaderActionTypes.SET_STATUS_UPLOADING: {
      const { id, uploadTask } = action;
      const status = FileStatus.UPLOADING;
      const progress = 0;
      const nextFileData = { status, progress, id, uploadTask };

      const files = updateFiles(state.files, nextFileData);

      return { ...state, files };
    }
    case FileUploaderActionTypes.SET_STATUS_UPLOADED: {
      const files = updateFiles(state.files, action);
      return { ...state, files };
    }
    case FileUploaderActionTypes.SET_UPLOAD_PROGRESS: {
      const { id, progress } = action;
      const files = updateFiles(state.files, { id, progress });

      return { ...state, files };
    }
    case FileUploaderActionTypes.SET_STATUS: {
      const { id, status } = action;
      const files = updateFiles(state.files, { id, status });

      return { ...state, files };
    }
    case FileUploaderActionTypes.REMOVE_UPLOAD: {
      const { id } = action;
      const { files } = state;

      const newFiles = files.reduce<StorageFiles>((files, currentFile) => {
        // remove by not returning currentFile
        return currentFile.id === id ? [...files] : [...files, currentFile];
      }, []);

      return { ...state, files: newFiles };
    }
  }
}
