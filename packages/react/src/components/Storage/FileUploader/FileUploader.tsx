import React, { useEffect } from 'react';
import { translate } from '@aws-amplify/ui';
import { FileUploaderProps } from './types';
import { useFileUploader } from './hooks/useFileUploader';
import { Text } from '../../../primitives';
import { UploaderButton } from './UploaderButton';
import { Previewer } from './Previewer';
import { UploadDropZone } from './UploadDropZone';

export function FileUploader({
  acceptedFileTypes,
  fileNames,
  isPreviewerVisible,
  level,
  components: customComponents = {},
  maxFiles,
  maxMultipleSize,
  maxSize,
  multiple = true,
  onChange,
  onError,
  onSuccess,
  path,
  variation = 'button',
}: FileUploaderProps): JSX.Element {
  const {
    UploadDropZone = FileUploader.UploadDropZone,
    UploaderButton = FileUploader.UploaderButton,
  } = customComponents;
  const {
    setShowPreviewer,
    showPreviewer,
    inDropZone,
    setFiles,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDrop,
    onDragOver,
  } = useFileUploader();

  // eslint-disable-next-line no-console
  console.log(
    'todo:',
    maxMultipleSize,
    maxSize,
    maxFiles,
    onChange,
    onError,
    onSuccess,
    path,
    level,
    fileNames
  );

  useEffect(() => {
    setShowPreviewer(isPreviewerVisible);
  }, [setShowPreviewer, isPreviewerVisible]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const { files } = event.target;
    setFiles([...files]);
    setShowPreviewer(true);
  };
  const CommonProps = {
    acceptedFileTypes,
    multiple,
    onFileChange,
  };

  if (showPreviewer) {
    return <Previewer />;
  } else if (variation === 'button') {
    return <UploaderButton {...CommonProps} />;
  } else {
    return (
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
    );
  }
}

FileUploader.UploadDropZone = UploadDropZone;
FileUploader.UploaderButton = UploaderButton;
