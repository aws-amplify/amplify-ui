import React from 'react';
import { translate } from '@aws-amplify/ui';
import { UploadButtonProps } from '../types';
import { Button, VisuallyHidden } from '../../../../primitives';

export function UploadButton({
  multiple,
  acceptedFileTypes,
  onFileChange,
  className,
  isLoading,
  hiddenInput,
  onClick,
}: UploadButtonProps): JSX.Element {
  return (
    <>
      <Button
        disabled={isLoading}
        className={className}
        size="small"
        onClick={onClick}
        variation="primary"
      >
        {translate('Browse files')}
      </Button>
      <VisuallyHidden>
        <input
          type="file"
          tabIndex={-1}
          ref={hiddenInput}
          onChange={onFileChange}
          multiple={multiple}
          accept={acceptedFileTypes?.join()}
        />
      </VisuallyHidden>
    </>
  );
}
