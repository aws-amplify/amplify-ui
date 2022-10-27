import React from 'react';
import { translate } from '@aws-amplify/ui';
import { PreviewerProps } from '../types';
import { Button, Card, Flex, Text, View } from '../../../../primitives';
import { UploadDropZone } from '../UploadDropZone';
import { UploadButton } from '../UploadButton';
import { Tracker } from '../Tracker';

export function Previewer({
  acceptedFileTypes,
  files,
  inDropZone,
  multiple,
  onClose,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDrop,
  onFileChange,
}: PreviewerProps): JSX.Element {
  const CommonProps = {
    acceptedFileTypes,
    multiple,
    onFileChange,
  };

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
            {...CommonProps}
            className={'amplify-fileuploader__dropzone__button'}
          />
        </UploadDropZone>
        <Text fontWeight="bold">{files.length} files selected</Text>
        {files?.map((file, index) => (
          <Tracker key={index}>{file.name}</Tracker>
        ))}
        <View className="amplify-fileuploader--footer">
          <View>
            <Button size="small" variation="primary" onClick={onClick}>
              Upload {files.length} files
            </Button>
          </View>
          <Button size="small" variation="link" onClick={onClose}>
            Clear all
          </Button>
        </View>
      </Flex>
    </Card>
  );
}
