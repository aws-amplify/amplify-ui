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

function StorageManager({
  acceptedFileTypes, // passed directly to file input && to limit uploads
  accessLevel, // used on upload
  displayText: overrideDisplayText, // UI only
  isResumable = false, // used on upload / determines if edit is shown
  // maxFileCount, // used on upload
  maxFileSize, // used on add file to set error
  // onError, // customer handler to fire on error
  // onSuccess, // customer handler to fire on success
  shouldAutoUpload, // used on upload
  showThumbnails = true, //
}: StorageManagerProps): JSX.Element {
  // const { uploads, addFiles } = useStorageManager();
  // const [files, setFiles] =
  const {
    dropFilesText,
    browseFilesText,
    // getErrorText,
    // getFilesUploadedText,
    // clearButtonText,
    // getRemainingFilesText,
    getFileSizeErrorText,
    getUploadingText,
    // getMaxFilesErrorText,
    // doneButtonText,
    getPausedText,
    pauseText,
    resumeText,
    extensionNotAllowedText,
    uploadSuccessfulText,
    // getUploadButtonText,
  } = {
    ...defaultStorageManagerDisplayText,
    ...overrideDisplayText,
  };

  const { files, addFiles, setUploadingFile, setUploadProgress } =
    useStorageManager();

  React.useEffect(() => {
    if (shouldAutoUpload) {
      const filesReadyToUpload = files.filter(
        (file) => file.status === FileState.READY
      );
      for (const { file, name, id } of filesReadyToUpload) {
        const onComplete = () => {
          // console.log('done!');
        };

        const onProgress: (progress: {
          loaded: number;
          total: number;
        }) => void = (progress) => {
          /**
           * When a file is zero bytes, the progress.total will equal zero.
           * Therefore, this will prevent a divide by zero error.
           */
          const progressPercentage =
            progress.total !== 0
              ? Math.floor((progress.loaded / progress.total) * 100)
              : 100;
          console.log('progress', progressPercentage);
          setUploadProgress({ id, progress: progressPercentage });
        };

        const onError = (error) => {
          console.error('something broke', error);
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
    }
  }, [
    files,
    accessLevel,
    isResumable,
    setUploadProgress,
    setUploadingFile,
    shouldAutoUpload,
  ]);

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

  const onDropZoneChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    if (isDragEvent(event)) {
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
    } else {
      const { files } = event.target;
      if (!files || files.length === 0) {
        return;
      }

      addFiles({
        files: Array.from(files),
        getFileErrorMessage: getMaxFileSizeErrorMessage,
      });
    }
  };

  return (
    <Container>
      <DropZone
        dropFilesText={dropFilesText}
        onChange={onDropZoneChange}
        browseFilesText={browseFilesText}
        acceptedFileTypes={acceptedFileTypes}
      />
      <FileList
        extensionNotAllowedText={extensionNotAllowedText}
        files={files}
        getPausedText={getPausedText}
        getUploadingText={getUploadingText}
        isResumable={isResumable}
        pauseText={pauseText}
        resumeText={resumeText}
        showThumbnails={showThumbnails}
        uploadSuccessfulText={uploadSuccessfulText}
      />
    </Container>
  );
}

StorageManager.Container = Container;
StorageManager.DropZone = DropZone;
StorageManager.FileList = FileList;

export { StorageManager };
