import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Logger } from 'aws-amplify';
import type { UploadTask } from '@aws-amplify/storage';
import { Storage } from '@aws-amplify/storage';
import { isValidExtension, uploadFile } from '@aws-amplify/ui';

import {
  Button as UploadButton,
  ComponentClassNames,
  VisuallyHidden,
} from '../../../../primitives';

import { useFileUploader } from '../hooks/useFileUploader';
import { UploadPreviewer } from '../UploadPreviewer';
import { UploadDropZone } from '../UploadDropZone';
import { UploadTracker } from '../UploadTracker';
import { FileState } from '../types';
import { FileUploaderProps } from './types';
import { isUploadTask } from './utils';
import { defaultFileUploaderDisplayText } from '../displayText';

const logger = new Logger('AmplifyUI:Storage');

export function FileUploader2({
  acceptedFileTypes,
  shouldAutoUpload = false,
  maxFileCount,
  maxFileSize,
  onError,
  onSuccess,
  showImages = true,
  accessLevel,
  variation = 'drop',
  isResumable = false,
  displayText: overrideDisplayText,
  ...rest
}: FileUploaderProps): JSX.Element {
  if (!acceptedFileTypes || !accessLevel) {
    logger.warn(
      'FileUploader requires accessLevel and acceptedFileTypes props'
    );
  }

  const {
    dropFilesText,
    browseFilesText,
    getErrorText,
    getFilesUploadedText,
    clearButtonText,
    getRemainingFilesText,
    getUploadingText,
    getMaxFilesErrorText,
    doneButtonText,
    getPausedText,
    pauseText,
    resumeText,
    extensionNotAllowedText,
    uploadSuccessfulText,
    getUploadButtonText,
  } = {
    ...defaultFileUploaderDisplayText,
    ...overrideDisplayText,
  };

  const allowMultipleFiles =
    maxFileCount === undefined ||
    (typeof maxFileCount === 'number' && maxFileCount > 1);

  // File Previewer loading state
  const [isLoading, setLoading] = useState(false);

  const {
    addTargetFiles,
    fileStatuses,
    inDropZone,
    setFileStatuses,
    showPreviewer,
    clearFiles,
    ...dropZoneProps
  } = useFileUploader({
    maxFileSize,
    acceptedFileTypes,
    allowMultipleFiles,
    isLoading,
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

  // Previewer Methods

  const progressCallback = useCallback(
    (index: number) => {
      return (progress: { loaded: number; total: number }) => {
        setFileStatuses((prevFileStatuses) => {
          const prevStatus = { ...prevFileStatuses[index] };

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
          const updatedStatus = {
            ...prevStatus,
            percentage: progressPercentage,
            fileState,
          };

          prevFileStatuses[index] = updatedStatus;

          return [...prevFileStatuses];
        });
      };
    },
    [setFileStatuses]
  );

  // HANDLE_ERROR
  const errorCallback = useCallback(
    (index: number) => {
      return (err: string) => {
        setFileStatuses((prevFileStatuses) => {
          const prevStatus = { ...prevFileStatuses[index] };

          const updatedStatus = {
            ...prevStatus,
            fileState: 'error' as FileState,
            fileErrors: getErrorText(err.toString()),
          };

          prevFileStatuses[index] = updatedStatus;

          return [...prevFileStatuses];
        });
        setLoading(false);
        if (typeof onError === 'function') onError(err);
      };
    },
    [onError, setFileStatuses, getErrorText]
  );
  // PAUSE_UPLOAD
  const onPause = useCallback(
    (index: number): (() => void) => {
      return function () {
        const status = fileStatuses[index];
        if (isUploadTask(status.uploadTask)) {
          status.uploadTask.pause();
        }
        const newFileStatuses = [...fileStatuses];

        newFileStatuses[index] = { ...status, fileState: FileState.PAUSED };
        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  // RESUME_UPLOAD
  const onResume = useCallback(
    (index: number): (() => void) => {
      return function () {
        const status = fileStatuses[index];

        if (isUploadTask(status.uploadTask)) {
          status.uploadTask.resume();
        }
        const newFileStatuses = [...fileStatuses];

        newFileStatuses[index] = { ...status, fileState: FileState.RESUME };
        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  // HANDLE_UPLOAD
  const handleUploadFile = useCallback(() => {
    if (hasMaxFilesError) return;

    // start upload
    setLoading(true);
    const uploadTasksTemp: UploadTask[] = [];
    fileStatuses.forEach((status, i) => {
      if (status?.fileState === FileState.SUCCESS) return;
      const uploadTask = uploadFile({
        file: status.file,
        fileName: status.name,
        level: accessLevel,
        isResumable,
        progressCallback: progressCallback(i),
        errorCallback: errorCallback(i),
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
    hasMaxFilesError,
    rest,
  ]);

  // HANDLE_FILE_CHANGE
  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const { files } = event.target;
      // Spread files here because a I need a File[] instead, it's easier to iterate through
      addTargetFiles([...files]);
    },
    [addTargetFiles]
  );

  // HANDLE_UPLOAD_CANCEL
  const onFileCancel = useCallback(
    (index: number) => {
      return () => {
        const { fileState, uploadTask } = fileStatuses[index];

        if (fileState === 'loading' && isUploadTask(uploadTask)) {
          // if downloading use uploadTask and stop download
          Storage.cancel(uploadTask);
          setLoading(false);
        }
        const updatedFiles = fileStatuses.filter((_, i) => i !== index);
        setFileStatuses(updatedFiles);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  // Tracker methods
  // HANDLE_FILENAME_EDIT
  const onSaveEdit = useCallback(
    (index: number) => {
      return (value: string) => {
        // no empty file names
        if (value.trim().length === 0) return;

        const newFileStatuses = [...fileStatuses];
        const status = fileStatuses[index];
        const validExtension = isValidExtension(value, status.file.name);
        newFileStatuses[index] = {
          ...status,
          name: value,
          fileState: !validExtension ? FileState.ERROR : FileState.INIT,
          fileErrors: validExtension ? undefined : extensionNotAllowedText,
        };

        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses, extensionNotAllowedText]
  );

  const updateFileState = useCallback(
    (index: number, fileState: FileState) => {
      setFileStatuses((prevFileStatuses) => {
        const newFileStatuses = [...prevFileStatuses];
        const status = newFileStatuses[index];
        // Check if extension is valid before setting state
        const validExtension = isValidExtension(status.name, status.file.name)
          ? FileState.INIT
          : FileState.ERROR;
        const updatedFileState =
          fileState === FileState.INIT ? validExtension : fileState;

        newFileStatuses[index] = {
          ...status,
          fileState: updatedFileState,
        };
        return newFileStatuses;
      });
    },
    [setFileStatuses]
  );

  const onCancelEdit = useCallback(
    (index: number) => {
      return () => {
        updateFileState(index, FileState.INIT);
      };
    },
    [updateFileState]
  );

  const onStartEdit = useCallback(
    (index: number) => {
      return (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        updateFileState(index, FileState.EDITING);
      };
    },
    [updateFileState]
  );

  const hiddenInput = React.useRef<HTMLInputElement>();

  const accept = acceptedFileTypes?.join();

  const uploadButtonComponent = useMemo(
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
          {browseFilesText}
        </UploadButton>
        <VisuallyHidden>
          <input
            type="file"
            tabIndex={-1}
            ref={hiddenInput}
            onChange={onFileChange}
            multiple={allowMultipleFiles}
            accept={accept}
          />
        </VisuallyHidden>
      </>
    ),
    [isLoading, onFileChange, allowMultipleFiles, accept, browseFilesText]
  );

  if (showPreviewer) {
    return (
      <UploadPreviewer
        dropZone={
          <UploadDropZone
            {...dropZoneProps}
            dropFilesText={dropFilesText}
            inDropZone={inDropZone}
          >
            {uploadButtonComponent}
          </UploadDropZone>
        }
        getFilesUploadedText={getFilesUploadedText}
        clearButtonText={clearButtonText}
        getRemainingFilesText={getRemainingFilesText}
        getUploadButtonText={getUploadButtonText}
        getUploadingText={getUploadingText}
        getMaxFilesErrorText={getMaxFilesErrorText}
        doneButtonText={doneButtonText}
        fileStatuses={fileStatuses}
        isLoading={isLoading}
        isSuccessful={isSuccessful}
        hasMaxFilesError={hasMaxFilesError}
        maxFileCount={maxFileCount}
        onClear={clearFiles}
        onFileClick={handleUploadFile}
        aggregatePercentage={aggregatePercentage}
      >
        {fileStatuses?.map((status, index) => (
          <UploadTracker
            pauseText={pauseText}
            getPausedText={getPausedText}
            getUploadingText={getUploadingText}
            resumeText={resumeText}
            extensionNotAllowedText={extensionNotAllowedText}
            uploadSuccessfulText={uploadSuccessfulText}
            errorMessage={status?.fileErrors}
            file={status.file}
            fileState={status?.fileState}
            hasImage={status.file?.type.startsWith('image/')}
            showImage={showImages}
            key={index}
            displayName={status.name}
            onCancel={onFileCancel(index)}
            onCancelEdit={onCancelEdit(index)}
            onPause={onPause(index)}
            onResume={onResume(index)}
            onSaveEdit={onSaveEdit(index)}
            onStartEdit={onStartEdit(index)}
            handleUploadFile={handleUploadFile}
            shouldAutoLoad={shouldAutoUpload}
            percentage={status.percentage}
            isResumable={isResumable}
          />
        ))}
      </UploadPreviewer>
    );
  }

  if (variation === 'button') {
    return uploadButtonComponent;
  } else {
    return (
      <UploadDropZone
        {...dropZoneProps}
        dropFilesText={dropFilesText}
        inDropZone={inDropZone}
      >
        {uploadButtonComponent}
      </UploadDropZone>
    );
  }
}
