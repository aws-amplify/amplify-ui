import React from 'react';
import { translate } from '@aws-amplify/ui';
import { Button, ButtonProps } from '../../../../primitives';

export function UploadButton({
  className,
  isDisabled,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <Button
      isDisabled={isDisabled}
      className={className}
      size="small"
      onClick={onClick}
      variation="primary"
    >
      {translate('Browse files')}
    </Button>
  );
}
