/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { FileUploaderProps } from './types';
import { UploaderButton } from './UploaderButton';
import { Previewer } from './Previewer';
import { View } from '../../../primitives';
import { UploaderDrop } from './UploaderDrop';
import { useFileUploader } from './hooks/useFileUploader';

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
  function Router(): JSX.Element {
    const { UploaderDrop = FileUploader.UploaderDrop } = customComponents;
    const {
      files,
      getDropEvents,
      inDropZone,
      setFiles,
      setShowPreviewer,
      showPreviewer,
    } = useFileUploader();

    useEffect(() => {
      setShowPreviewer(isPreviewerVisible);
    }, [setShowPreviewer]);

    function onClose() {
      setShowPreviewer(false);
    }

    function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
      if (!event.target.files || event.target.files.length === 0) return;

      const { files } = event.target;
      setFiles([...files]);
      setShowPreviewer(true);

      // eslint-disable-next-line no-console
      console.log('uploading', files[0], fileNames);
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
    } else if (variation === 'button') {
      return <UploaderButton {...commonProps} />;
    } else {
      return (
        <UploaderDrop getDropEvents={getDropEvents} inDropZone={inDropZone}>
          <UploaderButton {...commonProps} />
          <View as="span">or drag file{multiple ? 's' : ''} here</View>
        </UploaderDrop>
      );
    }
  }

  return <Router />;
}

FileUploader.UploaderDrop = UploaderDrop;
