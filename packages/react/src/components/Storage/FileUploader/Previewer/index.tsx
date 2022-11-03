import React from 'react';
import { translate } from '@aws-amplify/ui';
import { PreviewerProps } from '../types';
import {
  Alert,
  Button,
  Card,
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
    fileStatuses.filter((file) => file?.success).length;

  const remainingFilesLength = fileStatuses.length - uploadedFilesLength();
  return (
    <Card variation="outlined" className="amplify-fileuploader__previewer">
      <Flex className="amplify-fileuploader__previewer__body">
        <UploadDropZone
          inDropZone={inDropZone}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDrop={onDrop}
        >
          <Text className="amplify-fileuploader__dropzone__text">
            {translate('Drop files here or')}
          </Text>
          <UploadButton
            acceptedFileTypes={acceptedFileTypes}
            multiple={multiple}
            onFileChange={onFileChange}
            className={'amplify-fileuploader__dropzone__button'}
          />
        </UploadDropZone>
        <Text fontWeight="bold">
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

        <View className="amplify-fileuploader__footer">
          {isLoading && (
            <>
              <Text>Uploading: {percentage}%</Text>
              <Loader
                className="amplify-fileuploader-loader"
                variation="linear"
                percentage={percentage}
                isDeterminate
              />
            </>
          )}
          {!isLoading && !isSuccess && (
            <>
              <View>
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
      </Flex>
      {maxFilesError && <Alert variation="error" heading={headingMaxFiles} />}
    </Card>
  );
}
