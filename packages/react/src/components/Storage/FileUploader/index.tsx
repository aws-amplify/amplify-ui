/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FileUploaderProps, SetFileType } from './types';
import { FileUploaderButton } from '../FileUploaderButton';
import { FileUploaderDrop } from '../FileUploaderDrop';
import { FilePreviewer } from '../FilePreviewer';
import { View } from 'src/primitives';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/storage)
 */

export function FileUploader({
  accept,
  fileName,
  level,
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
  const [showPreviewer, setShowPreviewer] = useState(false);
  const [files, setFiles] = useState<SetFileType>();

  const commonProps = {
    accept,
    fileName,
    multiple,
    setFiles,
    setShowPreviewer,
  };

  function Router(): JSX.Element {
    if (showPreviewer) {
      return (
        <FilePreviewer
          files={files}
          setShowPreviewer={setShowPreviewer}
          fileName={fileName}
          level={level}
        />
      );
    } else if (variation === 'button') {
      return <FileUploaderButton {...commonProps} />;
    } else {
      return (
        <FileUploaderDrop {...commonProps}>
          <FileUploaderButton {...commonProps} />
          <View as="span">or drag file{multiple ? 's' : ''} here</View>
        </FileUploaderDrop>
      );
    }
  }

  return <Router />;
}
