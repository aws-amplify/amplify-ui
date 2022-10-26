import React, { useEffect } from 'react';
import { translate } from '@aws-amplify/ui';
import { FileUploaderProps } from './types';
import { useFileUploader } from './hooks/useFileUploader';
import { Text } from '../../../primitives';
import { UploaderButton } from './UploaderButton';
import { Previewer } from './Previewer';
import { UploaderDrop } from './UploaderDrop';

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
  showPreview = false,
  variation = 'button',
}: FileUploaderProps): JSX.Element {
  const {
    UploaderDrop = FileUploader.UploaderDrop,
    UploaderButton = FileUploader.UploaderButton,
  } = customComponents;
  const {
    setShowPreviewer,
    showPreviewer,
    getDropEvents,
    inDropZone,
    setFiles,
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
    showPreview,
    level,
    fileNames
  );

  useEffect(() => {
    setShowPreviewer(isPreviewerVisible);
  }, [setShowPreviewer, isPreviewerVisible]);

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const { files } = event.target;
    setFiles([...files]);
    setShowPreviewer(true);
  };
  const CommonProps = {
    acceptedFileTypes,
    multiple,
    onUpload,
  };

  if (showPreviewer) {
    return <Previewer />;
  } else if (variation === 'button') {
    return <UploaderButton {...CommonProps} />;
  } else {
    return (
      <UploaderDrop getDropEvents={getDropEvents} inDropZone={inDropZone}>
        <Text className="amplify-fileuploader__dropzone__text">
          {translate('Drop files here or')}
        </Text>
        <UploaderButton
          {...CommonProps}
          className={'amplify-fileuploader__dropzone__button'}
        />
      </UploaderDrop>
    );
  }
}

FileUploader.UploaderDrop = UploaderDrop;
FileUploader.UploaderButton = UploaderButton;
