import React from 'react';
import { translate } from '@aws-amplify/ui';
import { PreviewerProps } from '../types';
import { Button, Card, Flex, Loader, Text, View } from '../../../../primitives';
import { UploadDropZone } from '../UploadDropZone';
import { UploadButton } from '../UploadButton';
import { Tracker } from '../Tracker';

export function Previewer({
  files,
  inDropZone,
  onClear,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDrop,
  onFileCancel,
  onNameChange,
  allFileNames,
  acceptedFileTypes,
  multiple,
  onFileChange,
  fileStatuses,
  onPause,
  onResume,
  onDelete,
  isLoading,
  isSuccess,
  percentage,
  onFileClick,
  isEditingName,
  onSaveEdit,
  onCancelEdit,
  onStartEdit,
}: PreviewerProps): JSX.Element {
  const uploadedFilesLength = () =>
    files.filter((_, i) => fileStatuses[i]?.success).length;

  const remainingFilesLength = files.length - uploadedFilesLength();
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
        {files?.map((file, index) => (
          <Tracker
            percentage={fileStatuses[index]?.percentage}
            file={file}
            hasImage={file?.type.startsWith('image/')}
            url={URL.createObjectURL(file)}
            key={index}
            onChange={(e): void => onNameChange(e, index)}
            onCancel={() => onFileCancel(index)}
            onPause={onPause(index)}
            onResume={onResume(index)}
            onDelete={onDelete}
            name={allFileNames[index]}
            isLoading={fileStatuses[index]?.loading}
            isError={fileStatuses[index]?.error}
            errorMessage={fileStatuses[index]?.fileErrors}
            isSuccess={fileStatuses[index]?.success}
            isPaused={fileStatuses[index]?.paused}
            isEditing={isEditingName[index]}
            onSaveEdit={(e): void => onSaveEdit(e, index)}
            onCancelEdit={(e): void => onCancelEdit(e, index)}
            onStartEdit={(e): void => onStartEdit(e, index)}
          />
        ))}
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
                    remainingFilesLength === 0
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
    </Card>
  );
}
