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
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

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
  useDeprecationWarning({
    shouldWarn: true,
    message:
      'FileUploader has exited Dev Preview and was renamed to StorageManager with some API changes. Please migrate to the StorageManager component, as the FileUploader component is no longer supported and will be removed in a future major release. https://ui.docs.amplify.aws/react/connected-components/storage/storagemanager',
  });

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
    maxSize: maxSize!,
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
    // @ts-ignore
    maxFileCount;

  useEffect(() => {
    // Loading ends when all files are at 100%
    if (Math.floor(aggregatePercentage) === 100) {
      setLoading(false);
    }
  }, [aggregatePercentage]);

  useEffect(() => {
    // @ts-ignore
    setShowPreviewer(isPreviewerVisible);
  }, [setShowPreviewer, isPreviewerVisible]);

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

  const errorCallback = useCallback(
    (index: number) => {
      return (err: string) => {
        setFileStatuses((prevFileStatuses) => {
          const prevStatus = { ...prevFileStatuses[index] };

          const updatedStatus = {
            ...prevStatus,
            fileState: 'error' as FileState,
            fileErrors: translate(err.toString()),
          };

          prevFileStatuses[index] = updatedStatus;

          return [...prevFileStatuses];
        });
        setLoading(false);
        if (typeof onError === 'function') onError(err);
      };
    },
    [onError, setFileStatuses]
  );

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

  const onFileClick = useCallback(() => {
    // start upload
    setLoading(true);
    const uploadTasksTemp: UploadTask[] = [];
    fileStatuses.forEach((status, i) => {
      if (status?.fileState === FileState.SUCCESS) return;
      const uploadTask = uploadFile({
        file: status.file!,
        fileName: status.name!,
        level: accessLevel,
        isResumable,
        progressCallback: progressCallback(i),
        errorCallback: errorCallback(i),
        // @ts-ignore
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
      const addedFilesLength = addTargetFiles!([...files]);
      // only show previewer if the added files are great then 0
      if (addedFilesLength > 0) {
        // @ts-ignore
        setShowPreviewer(true);
        setAutoLoad(true);
      }
    },
    [addTargetFiles, setShowPreviewer]
  );

  const onClear = useCallback(() => {
    setShowPreviewer!(false);
    setFileStatuses([]);
  }, [setFileStatuses, setShowPreviewer]);

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

  const onSaveEdit = useCallback(
    (index: number) => {
      return (value: string) => {
        // no empty file names
        if (value.trim().length === 0) return;

        const newFileStatuses = [...fileStatuses];
        const status = fileStatuses[index];
        const validExtension = isValidExtension(value, status.file!.name);
        newFileStatuses[index] = {
          ...status,
          name: value,
          fileState: !validExtension ? FileState.ERROR : FileState.INIT,
          fileErrors: validExtension
            ? undefined
            : translate('Extension not allowed'),
        };

        setFileStatuses(newFileStatuses);
      };
    },
    [fileStatuses, setFileStatuses]
  );

  const updateFileState = useCallback(
    (index: number, fileState: FileState) => {
      setFileStatuses((prevFileStatuses) => {
        const newFileStatuses = [...prevFileStatuses];
        const status = newFileStatuses[index];
        // Check if extension is valid before setting state
        const validExtension = isValidExtension(status.name!, status.file!.name)
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

  useEffect(() => {
    if (shouldAutoProceed && autoLoad && !hasMaxFilesError) {
      onFileClick();
    } else {
      return;
    }
    setAutoLoad(false);
  }, [shouldAutoProceed, onFileClick, autoLoad, hasMaxFilesError]);

  const hiddenInput = React.useRef<HTMLInputElement>(null);

  const accept = acceptedFileTypes?.join();

  const uploadButton = useMemo(
    () => (
      <>
        <UploadButton
          className={ComponentClassNames.FileUploaderDropZoneButton}
          isDisabled={isLoading}
          onClick={() => {
            hiddenInput?.current?.click();
            hiddenInput.current!.value = '';
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
        maxFileCount={maxFileCount!}
        onClear={onClear}
        onFileClick={onFileClick}
        aggregatePercentage={aggregatePercentage}
      >
        {fileStatuses?.map((status, index) => (
          <UploadTracker
            errorMessage={status?.fileErrors!}
            file={status.file!}
            fileState={status?.fileState!}
            hasImage={status.file?.type.startsWith('image/')!}
            showImage={showImages}
            key={index}
            name={status.name!}
            onCancel={onFileCancel(index)}
            onCancelEdit={onCancelEdit(index)}
            onPause={onPause(index)}
            onResume={onResume(index)}
            onSaveEdit={onSaveEdit(index)}
            onStartEdit={onStartEdit(index)}
            percentage={status.percentage!}
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
