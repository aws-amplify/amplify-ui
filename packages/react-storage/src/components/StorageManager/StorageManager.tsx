import * as React from 'react';
import { Logger } from 'aws-amplify';

import { UploadTask } from '@aws-amplify/storage';
import { ComponentClassNames, VisuallyHidden } from '@aws-amplify/ui-react';

import { useStorageManager, useUploadFiles, useDropZone } from './hooks';
import { FileStatus, StorageManagerProps, StorageManagerHandle } from './types';
import {
  Container,
  DropZone,
  FileList,
  FileListHeader,
  FilePicker,
} from './ui';
import {
  checkMaxFileSize,
  defaultStorageManagerDisplayText,
  filterAllowedFiles,
} from './utils';

const logger = new Logger('Storage.StorageManager');

function StorageManagerBase(
  {
    acceptedFileTypes = [],
    accessLevel,
    defaultFiles,
    displayText: overrideDisplayText,
    isResumable = false,
    maxFileCount,
    maxFileSize,
    onUploadError,
    onUploadSuccess,
    onFileRemove,
    onUploadStart,
    showThumbnails = true,
    processFile,
    components,
    provider,
    path,
  }: StorageManagerProps,
  ref: React.ForwardedRef<StorageManagerHandle>
): JSX.Element {
  if (!accessLevel || !maxFileCount) {
    logger.warn('FileUploader requires accessLevel and maxFileCount props');
  }

  const Components = {
    Container,
    DropZone,
    FileList,
    FilePicker,
    FileListHeader,
    ...components,
  };

  const allowMultipleFiles =
    maxFileCount === undefined ||
    (typeof maxFileCount === 'number' && maxFileCount > 1);

  const displayText = {
    ...defaultStorageManagerDisplayText,
    ...overrideDisplayText,
  };

  const { getFileSizeErrorText } = displayText;

  const getMaxFileSizeErrorMessage = (file: File): string => {
    return checkMaxFileSize({
      file,
      maxFileSize,
      getFileSizeErrorText,
    });
  };

  const {
    addFiles,
    clearFiles,
    files,
    removeUpload,
    setUploadingFile,
    setUploadPaused,
    setUploadProgress,
    setUploadSuccess,
    setUploadResumed,
  } = useStorageManager(defaultFiles);

  React.useImperativeHandle(ref, () => ({ clearFiles }));

  const dropZoneProps = useDropZone({
    onChange: (event: React.DragEvent<HTMLDivElement>) => {
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
    },
  });

  useUploadFiles({
    accessLevel,
    files,
    isResumable,
    maxFileCount,
    onUploadError,
    onUploadSuccess,
    onUploadStart,
    setUploadingFile,
    setUploadProgress,
    setUploadSuccess,
    processFile,
    provider,
    path,
  });

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

  const onPauseUpload = ({
    id,
    uploadTask,
  }: {
    id: string;
    uploadTask: UploadTask;
  }) => {
    uploadTask.pause();
    setUploadPaused({ id });
  };

  const onResumeUpload = ({
    id,
    uploadTask,
  }: {
    id: string;
    uploadTask: UploadTask;
  }) => {
    uploadTask.resume();
    setUploadResumed({ id });
  };

  const onCancelUpload = ({
    id,
    uploadTask,
  }: {
    id: string;
    uploadTask: UploadTask;
  }) => {
    // At this time we don't know if the delete
    // permissions are enabled (required to cancel upload),
    // so we do a pause instead and remove from files
    uploadTask.pause();
    removeUpload({ id });
  };

  const onDeleteUpload = ({ id }: { id: string }) => {
    // At this time we don't know if the delete
    // permissions are enabled, so we do a soft delete
    // from file list, but don't remove from storage
    removeUpload({ id });
    if (typeof onFileRemove === 'function') {
      const file = files.find((file) => file.id === id);
      if (file) {
        onFileRemove({ key: file.key });
      }
    }
  };

  // checks if all downloads completed to 100%
  const allUploadsSuccessful =
    files.length === 0
      ? false
      : files.every((file) => file?.status === FileStatus.UPLOADED);

  // Displays if over max files
  const hasMaxFilesError =
    files.filter((file) => file.progress < 100).length > maxFileCount;

  const uploadedFilesLength = files.filter(
    (file) => file?.status === FileStatus.UPLOADED
  ).length;

  const remainingFilesCount = files.length - uploadedFilesLength;

  const hasFiles = files.length > 0;

  const hiddenInput = React.useRef<HTMLInputElement>(null);
  function handleClick() {
    if (hiddenInput.current) {
      hiddenInput.current.click();
      hiddenInput.current.value = '';
    }
  }

  return (
    <Components.Container
      className={`${ComponentClassNames.StorageManager} ${
        hasFiles ? ComponentClassNames.StorageManagerPreviewer : ''
      }`}
    >
      <Components.DropZone {...dropZoneProps} displayText={displayText}>
        <>
          <Components.FilePicker onClick={handleClick}>
            {displayText.browseFilesText}
          </Components.FilePicker>
          <VisuallyHidden>
            <input
              type="file"
              tabIndex={-1}
              ref={hiddenInput}
              onChange={onFilePickerChange}
              multiple={allowMultipleFiles}
              accept={acceptedFileTypes.join(',')}
            />
          </VisuallyHidden>
        </>
      </Components.DropZone>
      {hasFiles ? (
        <Components.FileListHeader
          allUploadsSuccessful={allUploadsSuccessful}
          displayText={displayText}
          fileCount={files.length}
          remainingFilesCount={remainingFilesCount}
        />
      ) : null}
      <Components.FileList
        displayText={displayText}
        files={files}
        isResumable={isResumable}
        onCancelUpload={onCancelUpload}
        onDeleteUpload={onDeleteUpload}
        onResume={onResumeUpload}
        onPause={onPauseUpload}
        showThumbnails={showThumbnails}
        hasMaxFilesError={hasMaxFilesError}
        maxFileCount={maxFileCount}
      />
    </Components.Container>
  );
}

const StorageManager = Object.assign(
  React.forwardRef<StorageManagerHandle, StorageManagerProps>(
    StorageManagerBase
  ),
  {
    Container,
    DropZone,
    FileList,
    FileListHeader,
    FilePicker,
  }
);

export { StorageManager };
