/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { FileUploaderProps } from './types';
import { FileUploaderButton } from '../FileUploaderButton';
import { FilePreviewer } from '../FilePreviewer';
import { View } from 'src/primitives';
import { FileUploaderDrop } from '../FileUploaderDrop';
import { useFileUploader } from '@aws-amplify/ui-react-core';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/storage)
 */

export function FileUploader({
  accept,
  fileName,
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
    const { FileUploaderDrop = FileUploader.FileUploaderDrop } =
      customComponents;
    const {
      files,
      getDropEvents,
      inDropZone,
      setFiles,
      setShowPreviewer,
      showPreviewer,
    } = useFileUploader();
    const commonProps = {
      accept,
      fileName,
      multiple,
      setFiles,
      setShowPreviewer,
    };

    useEffect(() => {
      setShowPreviewer(isPreviewerVisible);
    }, [setShowPreviewer]);

    if (showPreviewer) {
      return (
        <FilePreviewer
          fileName={fileName}
          files={files}
          level={level}
          setShowPreviewer={setShowPreviewer}
        />
      );
    } else if (variation === 'button') {
      return <FileUploaderButton {...commonProps} />;
    } else {
      return (
        <FileUploaderDrop getDropEvents={getDropEvents} inDropZone={inDropZone}>
          <FileUploaderButton {...commonProps} />
          <View as="span">or drag file{multiple ? 's' : ''} here</View>
        </FileUploaderDrop>
      );
    }
  }

  return <Router />;
}

FileUploader.FileUploaderDrop = FileUploaderDrop;
