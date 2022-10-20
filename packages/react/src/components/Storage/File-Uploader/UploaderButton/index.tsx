import React from 'react';
import { Button } from '../../../../primitives/Button';
import { UploaderButtonProps } from '../types';

export function UploaderButton({
  multiple,
  acceptedFileTypes,
  onUpload,
}: UploaderButtonProps): JSX.Element {
  const hiddenInput = React.useRef<HTMLInputElement>();
  function handleClick() {
    hiddenInput.current.click();
  }

  return (
    <>
      <Button
        color="white"
        style={{ backgroundColor: '#067398' }}
        onClick={handleClick}
      >
        Upload file{multiple ? 's' : ''}
      </Button>
      <input
        type="file"
        ref={hiddenInput}
        onChange={onUpload}
        style={{ display: 'none' }}
        multiple={multiple}
        accept={acceptedFileTypes?.join()}
      />
    </>
  );
}
