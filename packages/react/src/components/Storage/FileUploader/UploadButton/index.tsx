import React from 'react';
import { translate } from '@aws-amplify/ui';
import { UploadButtonProps } from '../types';
import { Button, VisuallyHidden } from '../../../../primitives';

export function UploadButton({
  multiple,
  acceptedFileTypes,
  onFileChange,
  className,
}: UploadButtonProps): JSX.Element {
  const hiddenInput = React.useRef<HTMLInputElement>();
  const onClick = () => {
    hiddenInput.current.click();
    hiddenInput.current.value = null;
  };

  return (
    <>
      <Button
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
          ref={hiddenInput}
          onChange={onFileChange}
          multiple={multiple}
          accept={acceptedFileTypes?.join()}
        />
      </VisuallyHidden>
    </>
  );
}
