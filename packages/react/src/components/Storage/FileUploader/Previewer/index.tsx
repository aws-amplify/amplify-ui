import React from 'react';
import { translate } from '@aws-amplify/ui';
import { useFileUploader } from '../hooks/useFileUploader';
import { PreviewerProps } from '../types';
import { Button, Card, Flex, Text, View } from '../../../../primitives';
import { UploadDropZone } from '../UploadDropZone';
import { UploaderButton } from '../UploaderButton';
import { Tracker } from '../Tracker';

export function Previewer({
  fileNames,
  level,
  files,
  onClose,
  acceptedFileTypes,
  multiple,
  onFileChange,
}: PreviewerProps): JSX.Element {
  const {
    inDropZone,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDrop,
    onDragOver,
  } = useFileUploader();
  const CommonProps = {
    acceptedFileTypes,
    multiple,
    onFileChange,
  };
  // eslint-disable-next-line no-console
  console.log('todo', fileNames, level);

  const onClick = () => {
    // start upload
  };
  return (
    <Card variation="outlined" className="amplify-fileuploader__previewer">
      <Flex className="amplify-fileuploader__previewer__body">
        <UploadDropZone
          onDragStart={onDragStart}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onDragOver={onDragOver}
          inDropZone={inDropZone}
        >
          <Text className="amplify-fileuploader__dropzone__text">
            {translate('Drop files here or')}
          </Text>
          <UploaderButton
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
