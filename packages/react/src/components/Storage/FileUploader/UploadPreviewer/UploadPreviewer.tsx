import React from 'react';
import { ComponentClassName, translate } from '@aws-amplify/ui';
import { FileState, PreviewerProps } from '../types';
import {
  Alert,
  Button,
  ComponentClassNames,
  Loader,
  Text,
  View,
} from '../../../../primitives';

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
}: PreviewerProps): JSX.Element {
  const headingMaxFiles = `${translate(
    'Cannot choose more than'
  )} ${maxFileCount}`;
  const getUploadedFilesLength = () =>
    fileStatuses.filter((file) => file?.fileState === FileState.SUCCESS).length;

  const remainingFilesLength = fileStatuses.length - getUploadedFilesLength();
  const remainingFilesText = `${remainingFilesLength} ${
    remainingFilesLength === 1 ? translate('file') : translate('files')
  }`;
  const uploadedFilesText = `${getUploadedFilesLength()} ${
    getUploadedFilesLength() === 1
      ? translate('file uploaded')
      : translate('files uploaded')
  }`;

  const isDisabled =
    fileStatuses.some((status) =>
      [FileState.ERROR, FileState.EDITING].includes(status?.fileState!)
    ) ||
    remainingFilesLength === 0 ||
    hasMaxFilesError;

  return (
    <View className={ComponentClassNames.FileUploaderPreviewer}>
      <View className={ComponentClassNames.FileUploaderPreviewerBody}>
        {dropZone}
        <Text className={ComponentClassNames.FileUploaderPreviewerText}>
          {isSuccessful ? (
            uploadedFilesText
          ) : (
            <>{`${remainingFilesText} ${translate('selected')}`}</>
          )}
        </Text>
        {children}
      </View>

      <View className={ComponentClassNames.FileUploaderPreviewerFooter}>
        <View>
          {isLoading && (
            <>
              <Text>
                {translate('Uploading')}
                {aggregatePercentage > 0 ? `: ${aggregatePercentage}%` : ''}
              </Text>
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
                {translate('Clear all')}
              </Button>
              <Button
                disabled={isDisabled}
                size="small"
                variation="primary"
                onClick={onFileClick}
              >
                {`${translate('Upload')} ${remainingFilesText}`}
              </Button>
            </>
          )}
          {isSuccessful && (
            <Button size="small" onClick={onClear}>
              {translate('Done')}
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
