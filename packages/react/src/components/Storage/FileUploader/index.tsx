/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { FileUploaderProps } from './types';
import { FileUploaderButton } from '../FileUploaderButton';
import { FileUploaderDrop } from '../FileUploaderDrop';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/storage)
 */

export function FileUploader({
  maxSize,
  multiple = true,
  accept,
  maxMultipleSize,
  maxFiles,
  level,
  fileName,
  path,
  variation = 'button',
  showPreview = false,
  onSuccess,
  onError,
  onChange,
}: FileUploaderProps): JSX.Element {
  function VerifyVariation(): JSX.Element {
    if (variation === 'button') {
      return (
        <FileUploaderButton
          multiple={multiple}
          accept={accept}
          fileName={fileName}
        />
      );
    } else {
      return (
        <FileUploaderDrop
          multiple={multiple}
          accept={accept}
          fileName={fileName}
        />
      );
    }
  }

  return <VerifyVariation />;
}
