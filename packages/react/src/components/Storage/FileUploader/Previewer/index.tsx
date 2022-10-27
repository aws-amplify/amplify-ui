import React from 'react';
import { translate } from '@aws-amplify/ui';
import { PreviewerProps } from '../types';
import { Button, Card, Flex, Text, View } from '../../../../primitives';
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
}: PreviewerProps): JSX.Element {
  const onClick = () => {
    // start upload
  };
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
          {files.length} {translate('files selected')}
        </Text>
        {files?.map((file, index) => (
          <Tracker
            file={file}
            hasImage={file?.type.startsWith('image/')}
            url={URL.createObjectURL(file)}
            key={index}
            onChange={(e): void => onNameChange(e, index)}
            onCancel={() => onFileCancel(index)}
            name={allFileNames[index]}
          />
        ))}
        <View className="amplify-fileuploader__footer">
          <View>
            <Button size="small" variation="primary" onClick={onClick}>
              {translate(`Upload ${files.length} files`)}
            </Button>
          </View>
          <Button size="small" variation="link" onClick={onClear}>
            {translate('Clear all')}
          </Button>
        </View>
      </Flex>
    </Card>
  );
}
