/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { FileUploaderProps } from './types';
import { UploaderButton } from './UploaderButton';
import { Previewer } from './Previewer';
import { View, Text } from '../../../primitives';
import { UploaderDrop } from './UploaderDrop';
import { useFileUploader } from './hooks/useFileUploader';
import { translate } from '@aws-amplify/ui';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/storage)
 */

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
    files,
    getDropEvents,
    inDropZone,
    setFiles,
  } = useFileUploader();

  useEffect(() => {
    setShowPreviewer(isPreviewerVisible);
  }, [setShowPreviewer, isPreviewerVisible]);

  function onClose() {
    setShowPreviewer(false);
  }

  function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) return;

    const { files } = event.target;
    setFiles([...files]);
    setShowPreviewer(true);
  }
  const commonProps = {
    acceptedFileTypes,
    multiple,
    onUpload,
  };

  if (showPreviewer) {
    return (
      <Previewer
        fileNames={fileNames}
        files={files}
        level={level}
        onClose={() => onClose()}
      />
    );
  } else {
    return (
      <>
        {variation === 'button' ? (
          <UploaderButton {...commonProps} />
        ) : (
          <UploaderDrop getDropEvents={getDropEvents} inDropZone={inDropZone}>
            <Text className="amplify-fileuploader__dropzone__text">
              {translate('Drop files here or')}
            </Text>
            <UploaderButton
              {...commonProps}
              className={'amplify-fileuploader__dropzone__button'}
            />
          </UploaderDrop>
        )}
      </>
    );
  }
}

FileUploader.UploaderDrop = UploaderDrop;
FileUploader.UploaderButton = UploaderButton;
