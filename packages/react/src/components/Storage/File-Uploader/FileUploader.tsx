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
      // stubbed
    }, [setShowPreviewer]);

    function onClose() {
      // stubbed
    }

    function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
      // stubbed
    }
    const commonProps = {
      acceptedFileTypes,
      multiple,
      onUpload,
    };

    return (
      <Previewer
        fileNames={fileNames}
        files={files}
        level={level}
        onClose={() => onClose()}
      />
    );
  }

  return <Router />;
}

FileUploader.UploaderDrop = UploaderDrop;
