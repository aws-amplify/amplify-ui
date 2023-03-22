import * as React from 'react';

import { uploadFile } from '@aws-amplify/ui';

import { Container } from './Container';
import { DropZone } from '../DropZone';
import { defaultStorageManagerDisplayText } from '../displayText';
import { FileList } from '../FileList/FileList';
import { FileState } from '../types';
import { StorageManagerProps } from './types';
import { useStorageManager } from '../hooks/useStorageManager';
import { checkMaxFileSize } from '../utils/checkMaxFileSize';
import { filterAllowedFiles } from '../utils/filterAllowedFiles';
import { FileListContainer } from '../FileListContainer';
import { Alert, ComponentClassNames } from '../../../../primitives';
import { FileListHeader } from '../FileListHeader';
import { FilePicker } from '../DropZone/FilePicker';

function StorageManager({
  acceptedFileTypes, // passed directly to file input && to limit uploads
  accessLevel, // used on upload
  displayText: overrideDisplayText, // UI only
  isResumable = false, // used on upload / determines if edit is shown
  maxFileCount,
  maxFileSize, // used on add file to set error
  onUploadError, // customer handler to fire on error
  onUploadSuccess, // customer handler to fire on success
  showThumbnails = true, //
}: StorageManagerProps): JSX.Element {
  const {
    files,
    addFiles,
    setUploadingFile,
    setUploadProgress,
    setUploadSuccess,
    removeUpload,
  } = useStorageManager();

  React.useEffect(() => {
    const filesReadyToUpload = files.filter(
      (file) => file.status === FileState.READY
    );

    if (filesReadyToUpload.length > maxFileCount) {
      return;
    }

    for (const { file, name, id } of filesReadyToUpload) {
      // I don't think onComplete even runs?
      const onComplete: (event: { key: string }) => void = (event) => {
        console.log('done!');
        onUploadSuccess?.(event);
        setUploadSuccess({ id });
      };

      const onProgress: (progress: { loaded: number; total: number }) => void =
        (progress) => {
          /**
           * When a file is zero bytes, the progress.total will equal zero.
           * Therefore, this will prevent a divide by zero error.
           */
          const progressPercentage =
            progress.total !== 0
              ? Math.floor((progress.loaded / progress.total) * 100)
              : 100;
          console.log('progress', progressPercentage);
          if (progress.loaded === 100) {
            console.log('100% there!', progress);
          }
          setUploadProgress({ id, progress: progressPercentage });
        };

      const onError = (error) => {
        console.error('something broke', error);
        onUploadError?.(error);
      };

      if (isResumable) {
        // @TODO: get UploadTask later on
        throw new Error('not implemented yet');
      } else {
        uploadFile({
          file,
          fileName: name,
          isResumable: false,
          level: accessLevel,
          completeCallback: onComplete,
          progressCallback: onProgress,
          errorCallback: onError,
        });
      }
      setUploadingFile({ id });

      // dispatch action to save upload task here:
      // dispatch(uploadTask)
    }
  }, [
    files,
    accessLevel,
    isResumable,
    setUploadProgress,
    setUploadingFile,
    onUploadError,
    onUploadSuccess,
  ]);

  const allowMultipleFiles =
    maxFileCount === undefined ||
    (typeof maxFileCount === 'number' && maxFileCount > 1);

  const displayText = {
    ...defaultStorageManagerDisplayText,
    ...overrideDisplayText,
  };

  const { getFileSizeErrorText, browseFilesText } = displayText;

  const getMaxFileSizeErrorMessage = (file: File): string => {
    return checkMaxFileSize({
      file,
      maxFileSize,
      getFileSizeErrorText,
    });
  };

  const isDragEvent = (
    event: unknown
  ): event is React.DragEvent<HTMLDivElement> => {
    return !!(event as React.DragEvent<HTMLDivElement>)?.dataTransfer;
  };

  const onDropZoneChange = (event: React.DragEvent<HTMLDivElement>) => {
    const { files } = event.dataTransfer;
    if (!files || files.length === 0) {
      return;
    }

    const filteredFiles = filterAllowedFiles(
      Array.from(files),
      acceptedFileTypes
    );
    addFiles({
      files: filteredFiles,
      getFileErrorMessage: getMaxFileSizeErrorMessage,
    });
  };

  const onFilePickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }

    addFiles({
      files: Array.from(files),
      getFileErrorMessage: getMaxFileSizeErrorMessage,
    });
  };

  const onRemoveUpload = (id: string) => {
    removeUpload({ id });
  };

  const onRemoveAllUploads = () => {
    // @TODO: implement action to remove all uploads
  };

  const onUpload = () => {};

  // FileListFooter params
  // Creates aggregate percentage to show during downloads
  const allUploadsPercentage = Math.floor(
    files.reduce((prev, curr) => prev + (curr?.progress ?? 0), 0) / files.length
  );

  // checks if all downloads completed to 100%
  const allUploadsSuccessful =
    files.length === 0
      ? false
      : files.every((status) => status?.progress === 100);

  // Displays if over max files
  const hasMaxFilesError =
    files.filter((file) => file.progress < 100).length > maxFileCount;

  const uploadedFilesLength = files.filter(
    (file) => file?.status === FileState.SUCCESS
  ).length;

  const remainingFilesCount = files.length - uploadedFilesLength;

  const hasFiles = files.length > 0;

  return (
    <Container
      className={`${ComponentClassNames.StorageManager} ${
        hasFiles ? ComponentClassNames.StorageManagerPreviewer : ''
      }`}
    >
      <DropZone
        acceptedFileTypes={acceptedFileTypes}
        displayText={displayText}
        onChange={onDropZoneChange}
      >
        <FilePicker
          onFileChange={onFilePickerChange}
          displayText={displayText}
          acceptedFileTypes={acceptedFileTypes}
          allowMultipleFiles={allowMultipleFiles}
        />
      </DropZone>
      {hasFiles ? (
        <FileListHeader
          allUploadsSuccessful={allUploadsSuccessful}
          displayText={displayText}
          fileCount={files.length}
          remainingFilesCount={remainingFilesCount}
        />
      ) : null}
      <FileList
        displayText={displayText}
        files={files}
        isResumable={isResumable}
        onRemoveUpload={onRemoveUpload}
        showThumbnails={showThumbnails}
        hasMaxFilesError={hasMaxFilesError}
        maxFileCount={maxFileCount}
      />
    </Container>
  );
}

StorageManager.Container = Container;
StorageManager.DropZone = DropZone;
StorageManager.FileList = FileList;

export { StorageManager };
