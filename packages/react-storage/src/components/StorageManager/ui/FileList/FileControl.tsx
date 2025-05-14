import React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import { View, Loader, Button } from '@aws-amplify/ui-react';

import { FileStatus } from '../../../FileUploader/types';

import { FileStatusMessage } from './FileStatusMessage';
import { FileRemoveButton } from './FileRemoveButton';
import { UploadDetails } from './FileDetails';
import { FileThumbnail } from './FileThumbnail';
import type { FileControlProps } from './types';

export function FileControl({
  onPause,
  onResume,
  displayName,
  errorMessage,
  isImage,
  isResumable,
  loaderIsDeterminate,
  onRemove,
  progress,
  showThumbnails = true,
  size,
  status,
  displayText,
  thumbnailUrl,
}: FileControlProps): React.JSX.Element {
  const {
    getPausedText,
    getUploadingText,
    uploadSuccessfulText,
    pauseButtonText,
    resumeButtonText,
  } = displayText;

  return (
    <View className={ComponentClassName.StorageManagerFile}>
      <View className={ComponentClassName.StorageManagerFileWrapper}>
        {showThumbnails ? (
          <FileThumbnail
            isImage={isImage}
            fileName={displayName}
            url={thumbnailUrl}
          />
        ) : null}
        <UploadDetails displayName={displayName} fileSize={size} />
        {status === FileStatus.UPLOADING ? (
          <Loader
            className={ComponentClassName.StorageManagerLoader}
            variation="linear"
            percentage={progress}
            isDeterminate={loaderIsDeterminate}
            isPercentageTextHidden
          />
        ) : null}
        {isResumable &&
        (status === FileStatus.UPLOADING || status === FileStatus.PAUSED) ? (
          status === FileStatus.PAUSED ? (
            <Button onClick={onResume} size="small" variation="link">
              {resumeButtonText}
            </Button>
          ) : (
            <Button onClick={onPause} size="small" variation="link">
              {pauseButtonText}
            </Button>
          )
        ) : null}
        <FileRemoveButton
          altText={`Remove file ${displayName}`}
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
