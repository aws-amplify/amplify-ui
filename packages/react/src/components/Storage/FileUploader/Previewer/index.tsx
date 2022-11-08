import React from 'react';
import { translate } from '@aws-amplify/ui';
import { PreviewerProps } from '../types';
import {
  Alert,
  Button,
  ComponentClassNames,
  Flex,
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
  isEditingName,
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

        <View className={ComponentClassNames.FileUploaderPreviewerFooter}>
          {isLoading && (
            <>
              <Text>Uploading: {percentage}%</Text>
              <Loader
                className={ComponentClassNames.FileUploaderLoader}
                variation="linear"
                percentage={percentage}
                isPercentageTextHidden
                isDeterminate
              />
            </>
          )}
          {!isLoading && !isSuccess && (
            <>
              <View>
                <Button
                  disabled={
                    fileStatuses.some(
                      (status) => status?.fileState === 'error'
                    ) ||
                    isEditingName.some((edit) => edit) ||
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
              </View>
              <Button size="small" variation="link" onClick={onClear}>
                {translate('Clear all')}
              </Button>
            </>
          )}
          {isSuccess && (
            <>
              <Text />
              <Button size="small" onClick={onClear}>
                {translate('Done')}
              </Button>
            </>
          )}
        </View>
        {!isLoading && !isSuccess && (
          <Flex direction="row">
            <Button
              disabled={
                fileStatuses.some((status) => status?.error) ||
                isEditingName.some((edit) => edit) ||
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
          </Flex>
        )}
        {isSuccess && (
          <Button size="small" onClick={onClear}>
            {translate('Done')}
          </Button>
        )}
      </View>
      {maxFilesError && <Alert variation="error" heading={headingMaxFiles} />}
    </View>
  );
}
