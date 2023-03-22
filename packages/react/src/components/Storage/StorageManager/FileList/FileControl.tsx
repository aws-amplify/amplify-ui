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
  isImage,
  loaderIsDeterminate,
  onRemove,
  onStartEdit,
  // pauseText,
  progress,
  // resumeText,
  showThumbnails = true,
  size,
  status,
  displayText,
  thumbnailUrl,
}: FileControlProps): JSX.Element {
  // @TODO add back edit capabilities
  const showEditButton = false;
  const { getPausedText, getUploadingText, uploadSuccessfulText } = displayText;
  return (
    <View className={ComponentClassNames.StorageManagerFile}>
      <View className={ComponentClassNames.StorageManagerFileWrapper}>
        {showThumbnails ? (
          <FileThumbnail
            isImage={isImage}
            fileName={displayName}
            url={thumbnailUrl}
          />
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
        {status === FileState.READY ? (
          <FileRemoveButton
            altText={`Remove file${displayName}`}
            onClick={onRemove}
          />
        ) : null}
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
