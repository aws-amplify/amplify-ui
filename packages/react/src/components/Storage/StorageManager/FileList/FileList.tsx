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
  onCancelUpload,
  onDeleteUpload,
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
        const { file, status, progress, error, key, isImage, id, uploadTask } =
          storageFile;

        const thumbnailUrl = file && isImage ? URL.createObjectURL(file) : '';
        const loaderIsDeterminate = isResumable ? progress > 0 : true;
        const isUploading = status === FileStatus.UPLOADING;

        const onRemove = () => {
          if (
            isResumable &&
            (status === FileStatus.UPLOADING || status === FileStatus.PAUSED) &&
            uploadTask
          ) {
            onCancelUpload({ id, uploadTask });
          } else {
            onDeleteUpload({ id });
          }
        };

        const handlePauseUpload = () => {
          if (uploadTask) {
            onPause({ id, uploadTask });
          }
        };
        const handleResumeUpload = () => {
          if (uploadTask) {
            onResume({ id, uploadTask });
          }
        };

        return (
          <FileControl
            displayName={key}
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
