import React from 'react';

import {
  View,
  Loader,
  ComponentClassNames,
  Button,
} from '@aws-amplify/ui-react';

import { FileStatus } from '../types';
import { FileStatusMessage } from './FileStatusMessage';
import { FileRemoveButton } from './FileRemoveButton';
import { UploadDetails } from './FileDetails';
import { FileThumbnail } from './FileThumbnail';
import { FileControlProps } from './types';

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
}: FileControlProps): JSX.Element {
  const {
    getPausedText,
    getUploadingText,
    uploadSuccessfulText,
    pauseText,
    resumeText,
  } = displayText;

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
        <UploadDetails displayName={displayName} fileSize={size} />
        {status === FileStatus.UPLOADING ? (
          <Loader
            className={ComponentClassNames.StorageManagerLoader}
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
              {resumeText}
            </Button>
          ) : (
            <Button onClick={onPause} size="small" variation="link">
              {pauseText}
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
