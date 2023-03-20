import React from 'react';

import { View, Loader, ComponentClassNames } from '../../../../primitives';

import { FileState } from '../types';
import { FileStatusMessage } from './FileStatusMessage';
import { FileRemoveButton } from './FileRemoveButton';
import { UploadDetails } from './FileDetails';
import { FileThumbnail } from './FileThumbnail';
import { FileControlProps } from './types';

export function FileControl({
  // onCancelEdit,
  // onPause,
  // onResume,
  // onSaveEdit,
  displayName,
  errorMessage,
  // extensionNotAllowedText,
  getPausedText,
  getUploadingText,
  isImage,
  loaderIsDeterminate,
  onRemove,
  onStartEdit,
  // pauseText,
  progress,
  // resumeText,
  showThumbnails,
  size,
  status,
  uploadSuccessfulText,
  url,
}: FileControlProps): JSX.Element {
  // @TODO add back edit capabilities
  const showEditButton = false;

  return (
    <View className={ComponentClassNames.StorageManagerFile}>
      <View className={ComponentClassNames.StorageManagerFileWrapper}>
        {showThumbnails ? (
          <FileThumbnail isImage={isImage} fileName={displayName} url={url} />
        ) : null}

        <UploadDetails
          showEditButton={showEditButton}
          displayName={displayName}
          onClick={onStartEdit}
          fileSize={size}
        />

        {status === FileState.LOADING ? (
          <Loader
            className={ComponentClassNames.StorageManagerLoader}
            variation="linear"
            percentage={progress}
            isDeterminate={loaderIsDeterminate}
            isPercentageTextHidden
          />
        ) : null}

        <FileRemoveButton
          altText={`Remove file${displayName}`}
          onClick={onRemove}
        />
      </View>
      <FileStatusMessage
        uploadSuccessfulText={uploadSuccessfulText}
        getUploadingText={getUploadingText}
        getPausedText={getPausedText}
        status={status}
        errorMessage={errorMessage}
        percentage={progress}
      />
    </View>
  );
}
