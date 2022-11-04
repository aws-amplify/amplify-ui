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
  maxFilesError,
}: PreviewerProps): JSX.Element {
  const headingMaxFiles = translate('Over Max files!');
  const uploadedFilesLength = () =>
    files.filter((_, i) => fileStatuses[i]?.success).length;

  const remainingFilesLength = files.length - uploadedFilesLength();
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
      </View>
      <View className={ComponentClassNames.FileUploaderPreviewerFooter}>
        <View>
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
