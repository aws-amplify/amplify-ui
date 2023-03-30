import * as React from 'react';
import { Logger } from 'aws-amplify';
import { UploadTask } from '@aws-amplify/storage';

import { checkMaxFileSize } from '../utils/checkMaxFileSize';
import { ComponentClassNames } from '@aws-amplify/ui-react';
import { Container } from '../Container/Container';
import { defaultStorageManagerDisplayText } from '../displayText';
import { DropZone } from '../DropZone';
import { FileList } from '../FileList/FileList';
import { FileListHeader } from '../FileListHeader';
import { FilePicker } from '../DropZone/FilePicker';
import { FileStatus } from '../types';
import { filterAllowedFiles } from '../utils/filterAllowedFiles';
import { StorageManagerProps } from './types';
import { useStorageManager, useUploadFiles, useDropZone } from '../hooks';

const logger = new Logger('Storage.StorageManager');

function StorageManager({
  acceptedFileTypes,
  accessLevel,
  defaultFiles,
  displayText: overrideDisplayText,
  isResumable = false,
  maxFileCount,
  maxFileSize,
  onUploadError,
  onUploadSuccess,
  onFileRemove,
  showThumbnails = true,
  processFile,
  components,
  provider,
}: StorageManagerProps): JSX.Element {
  if (!acceptedFileTypes || !accessLevel || !maxFileCount) {
    logger.warn(
      'FileUploader requires accessLevel, acceptedFileTypes and maxFileCount props'
    );
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
    files,
    removeUpload,
    setUploadingFile,
    setUploadPaused,
    setUploadProgress,
    setUploadSuccess,
    setUploadResumed,
  } = useStorageManager(defaultFiles);

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
    setUploadingFile,
    setUploadProgress,
    setUploadSuccess,
    processFile,
    provider,
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
      : files.every((status) => status?.progress === 100);

  // Displays if over max files
  const hasMaxFilesError =
    files.filter((file) => file.progress < 100).length > maxFileCount;

  const uploadedFilesLength = files.filter(
    (file) => file?.status === FileStatus.UPLOADED
  ).length;

  const remainingFilesCount = files.length - uploadedFilesLength;

  const hasFiles = files.length > 0;

  return (
    <Components.Container
      className={`${ComponentClassNames.StorageManager} ${
        hasFiles ? ComponentClassNames.StorageManagerPreviewer : ''
      }`}
    >
      <Components.DropZone
        {...dropZoneProps}
        acceptedFileTypes={acceptedFileTypes}
        displayText={displayText}
      >
        <Components.FilePicker
          onFileChange={onFilePickerChange}
          displayText={displayText}
          acceptedFileTypes={acceptedFileTypes}
          allowMultipleFiles={allowMultipleFiles}
        />
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

StorageManager.Container = Container;
StorageManager.DropZone = DropZone;
StorageManager.FileList = FileList;
StorageManager.FileListHeader = FileListHeader;
StorageManager.FilePicker = FilePicker;

export { StorageManager };
