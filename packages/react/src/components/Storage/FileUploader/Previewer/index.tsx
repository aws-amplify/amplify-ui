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
  onClose,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDrop,
  ...rest
}: PreviewerProps): JSX.Element {
  // const [fileStatuses, setFileStatuses] = useState<FileStatuses>;

  const onClick = () => {
    // start upload
  };

  const getURL = (file: File): string => {
    return URL.createObjectURL(file);
  };

  const onFileCancel = () => {};

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // handle on Name Change
    // eslint-disable-next-line no-console
    console.log('got', event.target.value);
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
            {...rest}
            className={'amplify-fileuploader__dropzone__button'}
          />
        </UploadDropZone>
        <Text fontWeight="bold">{files.length} files selected</Text>
        {files?.map((file, index) => (
          <Tracker
            file={file}
            hasImage={file?.type.startsWith('image/')}
            url={getURL(file)}
            key={index}
            onChange={onNameChange}
            onCancel={onFileCancel}
          />
        ))}
        <View className="amplify-fileuploader__footer">
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
