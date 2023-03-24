import React from 'react';

import { Alert, View } from '../../../../primitives';
import { FileStatus } from '../types';
import { FileControl } from './FileControl';
import { FileListProps } from './types';

export function FileList({
  displayText,
  files,
  hasMaxFilesError,
  isResumable,
  onRemoveUpload,
  onResume,
  onPause,
  showThumbnails,
  maxFileCount,
}: FileListProps): JSX.Element | null {
  if (files.length < 1) {
    return null;
  }

  const { getMaxFilesErrorText } = displayText;
  const headingMaxFiles = getMaxFilesErrorText(maxFileCount);

  return (
    <View className={'amplify-storagemanager--filelist'}>
      {files.map((storageFile) => {
        const { file, status, progress, error, name, isImage, id, uploadTask } =
          storageFile;

        const thumbnailUrl = file && isImage ? URL.createObjectURL(file) : '';

        const loaderIsDeterminate = isResumable ? progress > 0 : true;
        const isUploading = status === FileStatus.UPLOADING;
        // const onCancel = () => console.log('cancel');

        const onRemove = () => {
          if (status === FileStatus.QUEUED) {
            onRemoveUpload(id);
          }
          if (status === FileStatus.UPLOADED) {
            // handle DELETE existing file here
          }
        };

        const handlePauseUpload = () => {
          onPause({ id, uploadTask });
        };
        const handleResumeUpload = () => {
          onResume({ id, uploadTask });
        };

        return (
          <FileControl
            displayName={name}
            errorMessage={error}
            displayText={displayText}
            isImage={isImage}
            isUploading={isUploading}
            isResumable={isResumable}
            key={id}
            loaderIsDeterminate={loaderIsDeterminate}
            onRemove={onRemove}
            onPause={handlePauseUpload}
            onResume={handleResumeUpload}
            progress={progress}
            showThumbnails={showThumbnails}
            size={file?.size}
            status={status}
            thumbnailUrl={thumbnailUrl}
          />
        );
      })}
      {hasMaxFilesError && (
        <Alert variation="error" heading={headingMaxFiles} />
      )}
    </View>
  );
}
