import React from 'react';
import { ComponentClassName } from '@aws-amplify/ui';

import {
  Alert,
  Button,
  ComponentClassNames,
  Loader,
  Text,
  View,
} from '../../../../primitives';

import { FileState } from '../types';
import { UploadPreviewerProps } from './types';

export function UploadPreviewer({
  aggregatePercentage,
  children,
  dropZone,
  fileStatuses,
  isLoading,
  isSuccessful,
  hasMaxFilesError,
  maxFileCount,
  onClear,
  onFileClick,
  maxFilesErrorText,
  remainingFilesText,
  filesUploadedText,
  uploadButtonText,
  uploadingText,
  clearButtonText,
  doneButtonText,
}: UploadPreviewerProps): JSX.Element {
  const headingMaxFiles = maxFilesErrorText(maxFileCount);
  const getUploadedFilesLength = () =>
    fileStatuses.filter((file) => file?.fileState === FileState.SUCCESS).length;

  const remainingFilesLength = fileStatuses.length - getUploadedFilesLength();

  const isDisabled =
    fileStatuses.some((status) =>
      [FileState.ERROR, FileState.EDITING].includes(status?.fileState)
    ) ||
    remainingFilesLength === 0 ||
    hasMaxFilesError;

  return (
    <View className={ComponentClassNames.FileUploaderPreviewer}>
      <View className={ComponentClassNames.FileUploaderPreviewerBody}>
        {dropZone}
        <Text className={ComponentClassNames.FileUploaderPreviewerText}>
          {isSuccessful
            ? filesUploadedText(getUploadedFilesLength())
            : remainingFilesText(remainingFilesLength)}
        </Text>
        {children}
      </View>

      <View className={ComponentClassNames.FileUploaderPreviewerFooter}>
        <View>
          {isLoading && (
            <>
              <Text>{uploadingText(aggregatePercentage)}</Text>
              <Loader
                className={ComponentClassNames.FileUploaderLoader}
                variation="linear"
                percentage={aggregatePercentage}
                isPercentageTextHidden
                isDeterminate
              />
            </>
          )}
        </View>

        <View className={ComponentClassName.FileUploaderPreviewerFooterActions}>
          {!isLoading && !isSuccessful && (
            <>
              <Button size="small" variation="link" onClick={onClear}>
                {clearButtonText}
              </Button>
              <Button
                disabled={isDisabled}
                size="small"
                variation="primary"
                onClick={onFileClick}
              >
                {uploadButtonText(remainingFilesLength)}
              </Button>
            </>
          )}
          {isSuccessful && (
            <Button size="small" onClick={onClear}>
              {doneButtonText}
            </Button>
          )}
        </View>
      </View>

      {hasMaxFilesError && (
        <Alert variation="error" heading={headingMaxFiles} />
      )}
    </View>
  );
}
