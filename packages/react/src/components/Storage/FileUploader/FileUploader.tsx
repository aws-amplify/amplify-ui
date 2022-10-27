import React, { useEffect } from 'react';
import { translate } from '@aws-amplify/ui';
import { FileUploaderProps } from './types';
import { useFileUploader } from './hooks/useFileUploader';
import { Text } from '../../../primitives';
import { UploadButton } from './UploadButton';
import { Previewer } from './Previewer';
import { UploadDropZone } from './UploadDropZone';

export function FileUploader({
  acceptedFileTypes,
  fileNames,
  isPreviewerVisible,
  level,
  components = {},
  multiple = true,
  variation = 'button',
}: FileUploaderProps): JSX.Element {
  const {
    UploadDropZone = FileUploader.UploadDropZone,
    UploadButton = FileUploader.UploadButton,
  } = components;
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
    files,
  } = useFileUploader();

  useEffect(() => {
    setShowPreviewer(isPreviewerVisible);
  }, [setShowPreviewer, isPreviewerVisible]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const { files } = event.target;
    setFiles([...files]);
    setShowPreviewer(true);
  };

  const onClose = () => {
    setShowPreviewer(false);
  };

  const CommonProps = {
    acceptedFileTypes,
    multiple,
    onFileChange,
  };

  if (showPreviewer) {
    return (
      <Previewer
        fileNames={fileNames}
        level={level}
        files={files}
        onClose={onClose}
        acceptedFileTypes={acceptedFileTypes}
        multiple={multiple}
        onFileChange={onFileChange}
      />
    );
  } else if (variation === 'button') {
    return <UploadButton {...CommonProps} />;
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
        <UploadButton
          {...CommonProps}
          className={'amplify-fileuploader__dropzone__button'}
        />
      </UploadDropZone>
    );
  }
}

FileUploader.UploadDropZone = UploadDropZone;
FileUploader.UploadButton = UploadButton;
