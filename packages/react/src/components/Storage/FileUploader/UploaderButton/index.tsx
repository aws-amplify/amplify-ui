import React from 'react';
import { translate } from '@aws-amplify/ui';
import { UploaderButtonProps } from '../types';
import { Button, VisuallyHidden } from '../../../../primitives';

export function UploaderButton({
  multiple,
  acceptedFileTypes,
  onChangeUpload,
  className,
}: UploaderButtonProps): JSX.Element {
  const hiddenInput = React.useRef<HTMLInputElement>();
  const onClick = () => {
    hiddenInput.current.click();
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
          onChange={onChangeUpload}
          multiple={multiple}
          accept={acceptedFileTypes?.join()}
        />
      </VisuallyHidden>
    </>
  );
}
