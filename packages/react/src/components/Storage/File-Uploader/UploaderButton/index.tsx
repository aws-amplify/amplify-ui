/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button, VisuallyHidden } from '../../../../primitives';
import { UploaderButtonProps } from '../types';
import { translate } from '@aws-amplify/ui';

export function UploaderButton({
  multiple,
  acceptedFileTypes,
  onUpload,
  className,
}: UploaderButtonProps): JSX.Element {
  const hiddenInput = React.useRef<HTMLInputElement>();
  function onClick() {
    hiddenInput.current.click();
  }

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
          onChange={onUpload}
          multiple={multiple}
          accept={acceptedFileTypes?.join()}
        />
      </VisuallyHidden>
    </>
  );
}
