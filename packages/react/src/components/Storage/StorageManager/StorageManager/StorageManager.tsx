import * as React from 'react';

import { Container } from '../Container/Container';
import { DropZone } from '../DropZone';
import { defaultStorageManagerDisplayText } from '../displayText';
import { FileList } from '../FileList/FileList';
import { FileStatus } from '../types';
import { StorageManagerProps } from './types';
import { useStorageManager } from '../hooks/useStorageManager';
import { checkMaxFileSize } from '../utils/checkMaxFileSize';
import { filterAllowedFiles } from '../utils/filterAllowedFiles';
import { ComponentClassNames } from '../../../../primitives';
import { FileListHeader } from '../FileListHeader';
import { FilePicker } from '../DropZone/FilePicker';
import { useUploadFiles } from '../hooks/useUploadFiles';
import { UploadTask } from '@aws-amplify/storage';

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
  showThumbnails = true,
}: StorageManagerProps): JSX.Element {
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
  });

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
        onResume={onResumeUpload}
        onPause={onPauseUpload}
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
StorageManager.FileListHeader = FileListHeader;
StorageManager.FilePicker = FilePicker;

export { StorageManager };
