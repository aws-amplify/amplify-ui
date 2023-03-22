import React from 'react';

import {
  Alert,
  Button,
  ComponentClassNames,
  Loader,
  Text,
  View,
} from '../../../../primitives';
import { StorageManagerDisplayText } from '../displayText';

export interface FileListFooter {
  allUploadsPercentage: number;
  displayText: StorageManagerDisplayText;
  isUploadDisabled: boolean;
  uploadsPending: boolean;
  allUploadsSuccessful: boolean;
  hasMaxFilesError: boolean;
  remainingFilesCount: number;
  onRemoveAllUploads: () => void;
  onUpload: () => void;
  maxFileCount: number;
}

export function FileListFooter({
  allUploadsPercentage,
  uploadsPending,
  allUploadsSuccessful,
  hasMaxFilesError,
  displayText,
  remainingFilesCount,
  onRemoveAllUploads,
  onUpload,
  isUploadDisabled,
  maxFileCount,
}: FileListFooter): JSX.Element {
  const {
    getUploadingText,
    getUploadButtonText,
    clearAllButtonText,
    doneButtonText,
    getMaxFilesErrorText,
  } = displayText;

  const headingMaxFiles = getMaxFilesErrorText(maxFileCount);

  return (
    <View className={ComponentClassNames.StorageManagerPreviewerFooter}>
      <View>
        {uploadsPending && (
          <>
            <Text>{getUploadingText(allUploadsPercentage)}</Text>
            <Loader
              className={ComponentClassNames.StorageManagerLoader}
              variation="linear"
              percentage={allUploadsPercentage}
              isPercentageTextHidden
              isDeterminate
            />
          </>
        )}
      </View>

      <View
        className={ComponentClassNames.StorageManagerPreviewerFooterActions}
      >
        {!uploadsPending && !allUploadsSuccessful && (
          <>
            <Button size="small" variation="link" onClick={onRemoveAllUploads}>
              {clearAllButtonText}
            </Button>
            <Button
              disabled={isUploadDisabled}
              size="small"
              variation="primary"
              onClick={onUpload}
            >
              {getUploadButtonText(remainingFilesCount)}
            </Button>
          </>
        )}
        {allUploadsSuccessful && (
          <Button size="small" onClick={onRemoveAllUploads}>
            {doneButtonText}
          </Button>
        )}
      </View>
      {hasMaxFilesError && (
        <Alert variation="error" heading={headingMaxFiles} />
      )}
    </View>
  );
}
