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
import { UploadDropZone } from '../UploadDropZone';
import { UploadButton } from '../UploadButton';

export function Previewer({
  acceptedFileTypes,
  children,
  fileStatuses,
  inDropZone,
  isLoading,
  isSuccess,
  maxFilesError,
  multiple,
  onClear,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDrop,
  onFileChange,
  onFileClick,
  percentage,
  hiddenInput,
  onUploadButtonClick,
}: PreviewerProps): JSX.Element {
  const headingMaxFiles = translate('Over Max files!');
  const uploadedFilesLength = () =>
    fileStatuses.filter((file) => file?.fileState === 'success').length;

  const remainingFilesLength = fileStatuses.length - uploadedFilesLength();
  return (
    <View className={ComponentClassNames.FileUploaderPreviewer}>
      <View className={ComponentClassNames.FileUploaderPreviewerBody}>
        <UploadDropZone
          inDropZone={inDropZone}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDrop={onDrop}
        >
          <Text className={ComponentClassNames.FileUploaderDropZoneText}>
            {translate('Drop files here or')}
          </Text>
          <UploadButton
            acceptedFileTypes={acceptedFileTypes}
            isLoading={isLoading}
            multiple={multiple}
            onFileChange={onFileChange}
            className={ComponentClassNames.FileUploaderDropZoneButton}
            hiddenInput={hiddenInput}
            onClick={onUploadButtonClick}
          />
        </UploadDropZone>
        <Text className={ComponentClassNames.FileUploaderPreviewerText}>
          {isSuccess ? (
            <>
              {uploadedFilesLength()} {translate('files uploaded')}
            </>
          ) : (
            <>
              {remainingFilesLength} {translate('files selected')}
            </>
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
          {!isLoading && !isSuccess && (
            <>
              <Button
                disabled={
                  fileStatuses.some((status) =>
                    ['error', 'editing'].includes(status?.fileState)
                  ) ||
                  remainingFilesLength === 0 ||
                  maxFilesError
                }
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
          {isSuccess && (
            <Button size="small" onClick={onClear}>
              {translate('Done')}
            </Button>
          )}
        </View>
      </View>

      {maxFilesError && <Alert variation="error" heading={headingMaxFiles} />}
    </View>
  );
}
