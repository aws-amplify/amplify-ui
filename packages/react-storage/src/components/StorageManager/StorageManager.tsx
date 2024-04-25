import * as React from 'react';

import {
  UploadDataOutput,
  UploadDataWithPathOutput,
} from 'aws-amplify/storage';
import { getLogger, ComponentClassName } from '@aws-amplify/ui';
import { VisuallyHidden } from '@aws-amplify/ui-react';
import { useSetUserAgent } from '@aws-amplify/ui-react-core';
import {
  useDropZone,
  useDeprecationWarning,
} from '@aws-amplify/ui-react/internal';

import { useStorageManager, useUploadFiles } from './hooks';
import { FileStatus, StorageManagerProps, StorageManagerHandle } from './types';
import {
  Container,
  DropZone,
  FileList,
  FileListHeader,
  FileListFooter,
  FilePicker,
} from './ui';
import {
  checkMaxFileSize,
  defaultStorageManagerDisplayText,
  filterAllowedFiles,
} from './utils';
import { VERSION } from '../../version';

const logger = getLogger('Storage');

function StorageManagerBase(
  {
    acceptedFileTypes = [],
    accessLevel,
    autoUpload = true,
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
    path,
    prefix,
  }: StorageManagerProps,
  ref: React.ForwardedRef<StorageManagerHandle>
): JSX.Element {
  useDeprecationWarning({
    message:
      'The `accessLevel` and `path` props have been deprecated in favor of the `prefix` prop.',
    shouldWarn: Boolean(accessLevel ?? path),
  });

  if (!maxFileCount) {
    logger.warn(
      '`StorageManager` requires the `maxFileCount` prop to be specified'
    );
  }

  if (!prefix && !accessLevel) {
    // set accessLevel to private to respect the default before adding the `prefix` prop
    accessLevel = 'private';
    // accessLevel has been depreacted so only guide the user to pass the `prefix` prop
    logger.warn('`StorageManager` requires the `prefix` prop to be specified');
  }

  if (prefix && accessLevel) {
    throw new Error(
      'The `prefix` and `accessLevel` props cannot be specified at the same time. Prefer usage of `prefix` as `accessLevel` has been deprecated and will be removed in a future major version'
    );
  }

  if (prefix && path) {
    throw new Error(
      'The `prefix` and `path` props cannot be specified at the same time. Prefer usage of `prefix` as `path` has been deprecated and will be removed in a future major version'
    );
  }

  const Components = {
    Container,
    DropZone,
    FileList,
    FilePicker,
    FileListHeader,
    FileListFooter,
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
    queueFiles,
    setUploadingFile,
    setUploadPaused,
    setUploadProgress,
    setUploadSuccess,
    setUploadResumed,
  } = useStorageManager(defaultFiles);

  React.useImperativeHandle(ref, () => ({ clearFiles }));

  const { dragState, ...dropZoneProps } = useDropZone({
    acceptedFileTypes,
    onDropComplete: ({ acceptedFiles, rejectedFiles }) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        logger.warn('Rejected files: ', rejectedFiles);
      }
      // We need to filter out files by extension here,
      // we don't get filenames on the drag event, only on drop
      const _acceptedFiles = filterAllowedFiles(
        acceptedFiles,
        acceptedFileTypes
      );
      addFiles({
        files: _acceptedFiles,
        status: autoUpload ? FileStatus.QUEUED : FileStatus.ADDED,
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
    path,
    prefix,
  });

  const onFilePickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }

    addFiles({
      files: Array.from(files),
      status: autoUpload ? FileStatus.QUEUED : FileStatus.ADDED,
      getFileErrorMessage: getMaxFileSizeErrorMessage,
    });
  };

  const onClearAll = () => {
    clearFiles();
  };

  const onUploadAll = () => {
    queueFiles();
  };

  const onPauseUpload = ({
    id,
    uploadTask,
  }: {
    id: string;
    uploadTask: UploadDataOutput | UploadDataWithPathOutput;
  }) => {
    uploadTask.pause();
    setUploadPaused({ id });
  };

  const onResumeUpload = ({
    id,
    uploadTask,
  }: {
    id: string;
    uploadTask: UploadDataOutput | UploadDataWithPathOutput;
  }) => {
    uploadTask.resume();
    setUploadResumed({ id });
  };

  const onCancelUpload = ({
    id,
    uploadTask,
  }: {
    id: string;
    uploadTask: UploadDataOutput | UploadDataWithPathOutput;
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

  // number of files selected for upload when autoUpload is turned off
  const selectedFilesCount = autoUpload ? 0 : remainingFilesCount;

  const hasFiles = files.length > 0;

  const hasUploadActions = !autoUpload && remainingFilesCount > 0;

  const hiddenInput = React.useRef<HTMLInputElement>(null);
  function handleClick() {
    if (hiddenInput.current) {
      hiddenInput.current.click();
      hiddenInput.current.value = '';
    }
  }

  useSetUserAgent({
    componentName: 'StorageManager',
    packageName: 'react-storage',
    version: VERSION,
  });

  return (
    <Components.Container
      className={`${ComponentClassName.StorageManager} ${
        hasFiles ? ComponentClassName.StorageManagerPreviewer : ''
      }`}
    >
      <Components.DropZone
        inDropZone={dragState !== 'inactive'}
        {...dropZoneProps}
        displayText={displayText}
      >
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
          selectedFilesCount={selectedFilesCount}
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
      {hasUploadActions ? (
        <Components.FileListFooter
          displayText={displayText}
          remainingFilesCount={remainingFilesCount}
          onClearAll={onClearAll}
          onUploadAll={onUploadAll}
        />
      ) : null}
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
    FileListFooter,
    FilePicker,
  }
);

export { StorageManager };
