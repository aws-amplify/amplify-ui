import { useReducer } from 'react';
import { checkMaxSize, returnAcceptedFiles } from '@aws-amplify/ui';

import { Files, FileState, FileStatus, FileStatuses } from '../../types';
import { UseFileUploader, UseFileUploaderProps } from './types';

interface UseFileUploaderState {
  fileStatuses: FileStatuses;
  showPreviewer: boolean;
  inDropZone: boolean;
}

enum FileUploaderActionTypes {
  SET_FILES = 'SET_FILES',
  SET_FILES_STATUSES = 'SET_FILES_STATUSES',
  SET_SHOW_PREVIEWER = 'SET_SHOW_PREVIEWER',
  SET_IN_DROPZONE = 'SET_IN_DROPZONE',
}

type Action =
  | {
      type: FileUploaderActionTypes.SET_FILES;
      payload: File[];
      maxFileSize: number; // @todo, move maxFileSize out of payload?
    }
  | {
      type: FileUploaderActionTypes.SET_FILES_STATUSES;
      payload: FileStatus[];
    }
  | { type: FileUploaderActionTypes.SET_IN_DROPZONE; payload: boolean }
  | { type: FileUploaderActionTypes.SET_SHOW_PREVIEWER; payload: boolean };

export const setShowPreviewerAction = (payload: boolean): Action => {
  return {
    type: FileUploaderActionTypes.SET_SHOW_PREVIEWER,
    payload,
  };
};

export const setFilesAction = (
  payload: File[],
  maxFileSize: number
): Action => {
  return {
    type: FileUploaderActionTypes.SET_FILES,
    payload,
    maxFileSize,
  };
};

export const setFileStatusesAction = (payload: FileStatus[]): Action => {
  return {
    type: FileUploaderActionTypes.SET_FILES_STATUSES,
    payload,
  };
};

export const setInDropZoneAction = (payload: boolean): Action => {
  return {
    type: FileUploaderActionTypes.SET_IN_DROPZONE,
    payload,
  };
};

const updateFileStatusArray = (
  files: Files,
  fileStatuses: FileStatuses,
  maxFileSize: number
): FileStatus[] => {
  const statuses = [...fileStatuses];
  [...files].forEach((file) => {
    const errorFile = checkMaxSize(maxFileSize, file);

    statuses.unshift({
      fileState: errorFile ? FileState.ERROR : FileState.INIT,
      fileErrors: errorFile,
      file,
      name: file.name,
    });
  });
  return statuses;
};

function reducer(
  state: UseFileUploaderState,
  action: Action
): UseFileUploaderState {
  switch (action.type) {
    case FileUploaderActionTypes.SET_SHOW_PREVIEWER: {
      return {
        ...state,
        showPreviewer: action.payload,
      };
    }
    case FileUploaderActionTypes.SET_IN_DROPZONE: {
      return {
        ...state,
        inDropZone: action.payload,
      };
    }
    case FileUploaderActionTypes.SET_FILES: {
      const newFiles = updateFileStatusArray(
        action.payload,
        state.fileStatuses,
        action.maxFileSize
      );

      return {
        ...state,
        fileStatuses: newFiles,
        showPreviewer: newFiles.length > 0, // only show previewer if the added files are great then 0
      };
    }
    case FileUploaderActionTypes.SET_FILES_STATUSES: {
      return {
        ...state,
        fileStatuses: [...action.payload],
        showPreviewer: action.payload.length > 0, // only show previewer if the added files are great then 0
      };
    }
  }
  // throw Error('Unknown action: ' + action.type);
}

export function useFileUploader({
  maxFileSize,
  acceptedFileTypes,
  allowMultipleFiles,
  isLoading,
}: UseFileUploaderProps): UseFileUploader {
  const [state, dispatch] = useReducer<
    (prevState: UseFileUploaderState, action: Action) => UseFileUploaderState
  >(reducer, { fileStatuses: [], showPreviewer: false, inDropZone: false });
  const { showPreviewer, inDropZone, fileStatuses } = state;

  const addTargetFiles = (targetFiles: File[]): void => {
    // Only accept accepted files
    const targets = returnAcceptedFiles([...targetFiles], acceptedFileTypes);

    // Ignore request no accepted files or if multiple files not allowed
    if (!targets || (!allowMultipleFiles && fileStatuses.length > 0)) return;

    // if not multiple and only 1 file selected save
    if (!allowMultipleFiles && targets.length == 1) {
      dispatch(setFilesAction([...targets], maxFileSize));
    }

    // @TODO is this for browsers which ignore multiple html attribute?
    // if not multiple save just the first target into the array
    if (!allowMultipleFiles && targets.length > 1) {
      dispatch(setFilesAction([targets[0]], maxFileSize));
    }

    if (targets.length > 0) {
      dispatch(setFilesAction([...targets], maxFileSize));
    }
  };

  const setFileStatuses: UseFileUploader['setFileStatuses'] = (
    fileStatuses
  ) => {
    // @TODO: replace with isFunction
    if (typeof fileStatuses === 'function') {
      const newFileStatuses = fileStatuses(state.fileStatuses);
      dispatch(setFileStatusesAction(newFileStatuses));
    } else {
      dispatch(setFileStatusesAction(fileStatuses));
    }
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
  };
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading) return false;
    dispatch(setInDropZoneAction(false));
  };
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading) return false;
    dispatch(setInDropZoneAction(true));
    event.dataTransfer.dropEffect = 'copy';
  };
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading) return false;
    const { files } = event.dataTransfer;
    addTargetFiles([...files]);
  };

  const clearFiles = () => {
    dispatch(setFilesAction([], maxFileSize));
  };

  return {
    inDropZone,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    addTargetFiles,
    showPreviewer,
    fileStatuses,
    setFileStatuses,
    clearFiles,
  };
}

export default useFileUploader;
