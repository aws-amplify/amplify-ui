import React from 'react';
import { ComponentClassName, translate } from '@aws-amplify/ui';
import { PreviewerProps } from '../types';
import {
  Alert,
  Button,
  ComponentClassNames,
  Loader,
  Text,
  View,
} from '../../../../primitives';
// import { UploadDropZone } from '../UploadDropZone';
// import { UploadButton } from '../UploadButton';

export function Previewer({
  children,
  dropZone,
  fileStatuses,
  isLoading,
  isSuccessful,
  hasMaxFilesError,
  onClear,
  onFileClick,
  percentage,
}: PreviewerProps): JSX.Element {
  const headingMaxFiles = translate('Over Max files');
  const getUploadedFilesLength = () =>
    fileStatuses.filter((file) => file?.fileState === 'success').length;

  const remainingFilesLength = fileStatuses.length - getUploadedFilesLength();

  const isDisabled =
    fileStatuses.some((status) =>
      ['error', 'editing'].includes(status?.fileState)
    ) ||
    remainingFilesLength === 0 ||
    hasMaxFilesError;

  return (
    <View className={ComponentClassNames.FileUploaderPreviewer}>
      <View className={ComponentClassNames.FileUploaderPreviewerBody}>
        {dropZone}
        <Text className={ComponentClassNames.FileUploaderPreviewerText}>
          {isSuccessful ? (
            <>{`${getUploadedFilesLength()} ${translate('files uploaded')}`}</>
          ) : (
            <>{`${remainingFilesLength} ${translate('files selected')}`}</>
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
                {percentage > 0 ? `: ${percentage}%` : ''}
              </Text>
              <Loader
                className={ComponentClassNames.FileUploaderLoader}
                variation="linear"
                percentage={percentage}
                isPercentageTextHidden
                isDeterminate
              />
            </>
          )}
        </View>

        <View className={ComponentClassName.FileUploaderPreviewerFooterActions}>
          {!isLoading && !isSuccessful && (
            <>
              <Button
                disabled={isDisabled}
                size="small"
                variation="primary"
                onClick={onFileClick}
              >
                {translate('Upload')}
                {` ${remainingFilesLength} `}
                {translate('files')}
              </Button>

              <Button size="small" variation="link" onClick={onClear}>
                {translate('Clear all')}
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
