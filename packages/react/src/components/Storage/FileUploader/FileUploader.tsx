import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { UploadTask, Storage } from '@aws-amplify/storage';
import { translate, uploadFile, isValidExtension } from '@aws-amplify/ui';
import { Logger } from 'aws-amplify';

import {
  Button as UploadButton,
  ComponentClassNames,
  VisuallyHidden,
} from '../../../primitives';

import { useFileUploader } from './hooks/useFileUploader';
import { UploadPreviewer } from './UploadPreviewer';
import { UploadDropZone } from './UploadDropZone';
import { UploadTracker } from './UploadTracker';
import { FileState, FileUploaderProps } from './types';

const isUploadTask = (value: unknown): value is UploadTask =>
  typeof (value as UploadTask)?.resume === 'function';

const logger = new Logger('AmplifyUI:Storage');

export function FileUploader({
  acceptedFileTypes,
  shouldAutoProceed = false,
  isPreviewerVisible,
  maxFileCount,
  maxSize,
  hasMultipleFiles = true,
  onError,
  onSuccess,
  showImages = true,
  accessLevel,
  variation = 'drop',
  isResumable = false,
  ...rest
}: FileUploaderProps): JSX.Element {
  if (!acceptedFileTypes || !accessLevel) {
    logger.warn(
      'FileUploader requires accessLevel and acceptedFileTypes props'
    );
  }

  // File Previewer loading state
  const [isLoading, setLoading] = useState(false);
  const [autoLoad, setAutoLoad] = useState(false);

  const {
    addTargetFiles,
    fileStatuses,
    inDropZone,
    setFileStatuses,
    setShowPreviewer,
    showPreviewer,
    ...dropZoneProps
  } = useFileUploader({
    maxSize,
    acceptedFileTypes,
    hasMultipleFiles,
    isLoading,
    setAutoLoad,
  });

  // Creates aggregate percentage to show during downloads
  const aggregatePercentage = Math.floor(
    fileStatuses.reduce((prev, curr) => prev + (curr?.percentage ?? 0), 0) /
      fileStatuses.length
  );

  // checks if all downloads completed to 100%
  const isSuccessful =
    fileStatuses.length === 0
      ? false
      : fileStatuses.every((status) => status?.percentage === 100);

  // Displays if over max files

  const hasMaxFilesError =
    fileStatuses.filter((file) => file.percentage !== 100).length >
    maxFileCount;

  useEffect(() => {
    // Loading ends when all files are at 100%
    if (Math.floor(aggregatePercentage) === 100) {
      setLoading(false);
    }
  }, [aggregatePercentage]);

  useEffect(() => {
    setShowPreviewer(isPreviewerVisible);
  }, [setShowPreviewer, isPreviewerVisible]);

  // Previewer Methods

  const progressCallback = useCallback(
    (id: number) => {
      return (progress: { loaded: number; total: number }) => {
        setFileStatuses((prevFileStatuses) => {
          /**
           * When a file is zero bytes, the progress.total will equal zero.
           * Therefore, this will prevent a divide by zero error.
           */
          const progressPercentage =
            progress.total !== 0
              ? Math.floor((progress.loaded / progress.total) * 100)
              : 100;
          const fileState: FileState =
            progressPercentage !== 100 ? FileState.LOADING : FileState.SUCCESS;

          return prevFileStatuses.map((file) =>
            file.id === id
              ? { ...file, percentage: progressPercentage, fileState }
              : file
          );
        });
      };
    },
    [setFileStatuses]
  );

  const errorCallback = useCallback(
    (id: number) => {
      return (err: string) => {
        setFileStatuses((prevFileStatuses) => {
          return prevFileStatuses.map((file) =>
            file.id === id
              ? {
                  ...file,
                  fileState: 'error' as FileState,
                  fileErrors: translate(err.toString()),
                }
              : file
          );
        });
        setLoading(false);
        if (typeof onError === 'function') onError(err);
      };
    },
    [onError, setFileStatuses]
  );

  const updatePauseResume = useCallback(
    (id: number, fileState: FileState): (() => void) => {
      return function () {
        const { uploadTask } = fileStatuses.find((file) => file.id === id);
        if (isUploadTask(uploadTask)) {
          if (fileState === FileState.PAUSED) {
            uploadTask.pause();
          } else {
            uploadTask.resume();
          }
        }
        const newFileStatuses = fileStatuses.map((file) =>
          file.id === id ? { ...file, fileState } : file
        );
        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  const onPause = useCallback(
    (id: number) => {
      return updatePauseResume(id, FileState.PAUSED);
    },
    [updatePauseResume]
  );

  const onResume = useCallback(
    (id: number) => {
      return updatePauseResume(id, FileState.RESUME);
    },
    [updatePauseResume]
  );

  const onFileClick = useCallback(() => {
    // start upload
    setLoading(true);
    const uploadTasksTemp: UploadTask[] = [];
    fileStatuses.forEach((status) => {
      if (status?.fileState === FileState.SUCCESS) return;
      const uploadTask = uploadFile({
        file: status.file,
        fileName: status.name,
        level: accessLevel,
        isResumable,
        progressCallback: progressCallback(status.id),
        errorCallback: errorCallback(status.id),
        completeCallback: onSuccess,
        ...rest,
      });

      if (isUploadTask(uploadTask) && isResumable) {
        uploadTasksTemp.push(uploadTask);
      }
    });

    setFileStatuses((prevFileStatuses) =>
      prevFileStatuses.map((status, index) => ({
        ...status,
        uploadTask: uploadTasksTemp?.[index],
        fileState:
          status.fileState === FileState.INIT
            ? FileState.LOADING
            : status.fileState,
        percentage: status.percentage ?? 0,
      }))
    );
  }, [
    fileStatuses,
    setFileStatuses,
    accessLevel,
    isResumable,
    progressCallback,
    errorCallback,
    onSuccess,
    rest,
  ]);

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const { files } = event.target;
      // Spread files here because a I need a File[] instead, it's easier to iterate through
      const addedFilesLength = addTargetFiles([...files]);
      // only show previewer if the added files are great then 0
      if (addedFilesLength > 0) {
        setShowPreviewer(true);
        setAutoLoad(true);
      }
    },
    [addTargetFiles, setShowPreviewer]
  );

  const onClear = useCallback(() => {
    setShowPreviewer(false);
    setFileStatuses([]);
  }, [setFileStatuses, setShowPreviewer]);

  const onFileCancel = useCallback(
    (id: number) => {
      return () => {
        const { fileState, uploadTask } = fileStatuses.find(
          (file) => file.id === id
        );

        if (fileState === 'loading' && isUploadTask(uploadTask)) {
          // if downloading use uploadTask and stop download
          Storage.cancel(uploadTask);
          setLoading(false);
        }
        const updatedFiles = fileStatuses.filter((file) => file.id !== id);
        setFileStatuses(updatedFiles);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  // Tracker methods

  const onSaveEdit = useCallback(
    (id: number) => {
      return (value: string) => {
        // no empty file names
        if (value.trim().length === 0) return;

        const {
          file: { name },
        } = fileStatuses.find((file) => file.id === id);
        const validExtension = isValidExtension(value, name);

        const newFileStatuses = fileStatuses.map((file) =>
          file.id === id
            ? {
                ...file,
                name: value,
                fileState: !validExtension ? FileState.ERROR : FileState.INIT,
                fileErrors: validExtension
                  ? undefined
                  : translate('Extension not allowed'),
              }
            : file
        );

        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  const updateFileState = useCallback(
    (id: number, fileState: FileState) => {
      setFileStatuses((prevFileStatuses) => {
        const {
          file: { name },
          name: statusName,
        } = prevFileStatuses.find((file) => file.id === id);
        // Check if extension is valid before setting state

        const validExtension = isValidExtension(statusName, name)
          ? FileState.INIT
          : FileState.ERROR;

        const updatedFileState =
          fileState === FileState.INIT ? validExtension : fileState;

        return prevFileStatuses.map((file) =>
          file.id === id
            ? {
                ...file,
                fileState: updatedFileState,
              }
            : file
        );
      });
    },
    [setFileStatuses]
  );

  const onCancelEdit = useCallback(
    (id: number) => {
      return () => {
        updateFileState(id, FileState.INIT);
      };
    },
    [updateFileState]
  );

  const onStartEdit = useCallback(
    (id: number) => {
      return (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        updateFileState(id, FileState.EDITING);
      };
    },
    [updateFileState]
  );

  useEffect(() => {
    if (shouldAutoProceed && autoLoad && !hasMaxFilesError) {
      onFileClick();
    } else {
      return;
    }
    setAutoLoad(false);
  }, [shouldAutoProceed, onFileClick, autoLoad, hasMaxFilesError]);

  const hiddenInput = React.useRef<HTMLInputElement>();

  const accept = acceptedFileTypes?.join();

  const uploadButton = useMemo(
    () => (
      <>
        <UploadButton
          className={ComponentClassNames.FileUploaderDropZoneButton}
          isDisabled={isLoading}
          onClick={() => {
            hiddenInput.current.click();
            hiddenInput.current.value = null;
          }}
          size="small"
        >
          {translate('Browse files')}
        </UploadButton>
        <VisuallyHidden>
          <input
            type="file"
            tabIndex={-1}
            ref={hiddenInput}
            onChange={onFileChange}
            multiple={hasMultipleFiles}
            accept={accept}
          />
        </VisuallyHidden>
      </>
    ),
    [isLoading, onFileChange, hasMultipleFiles, accept]
  );

  if (showPreviewer) {
    return (
      <UploadPreviewer
        dropZone={
          <UploadDropZone {...dropZoneProps} inDropZone={inDropZone}>
            {uploadButton}
          </UploadDropZone>
        }
        fileStatuses={fileStatuses}
        isLoading={isLoading}
        isSuccessful={isSuccessful}
        hasMaxFilesError={hasMaxFilesError}
        maxFileCount={maxFileCount}
        onClear={onClear}
        onFileClick={onFileClick}
        aggregatePercentage={aggregatePercentage}
      >
        {fileStatuses?.map((status) => (
          <UploadTracker
            errorMessage={status?.fileErrors}
            file={status.file}
            fileState={status?.fileState}
            hasImage={status.file?.type.startsWith('image/')}
            showImage={showImages}
            key={status.id}
            name={status.name}
            onCancel={onFileCancel(status.id)}
            onCancelEdit={onCancelEdit(status.id)}
            onPause={onPause(status.id)}
            onResume={onResume(status.id)}
            onSaveEdit={onSaveEdit(status.id)}
            onStartEdit={onStartEdit(status.id)}
            percentage={status.percentage}
            isResumable={isResumable}
          />
        ))}
      </UploadPreviewer>
    );
  }

  if (variation === 'button') {
    return uploadButton;
  } else {
    return (
      <UploadDropZone {...dropZoneProps} inDropZone={inDropZone}>
        {uploadButton}
      </UploadDropZone>
    );
  }
}
