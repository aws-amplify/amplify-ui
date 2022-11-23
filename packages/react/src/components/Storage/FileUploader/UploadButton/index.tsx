import React from 'react';
import { translate } from '@aws-amplify/ui';
import { UploadButtonProps } from '../types';
import { Button } from '../../../../primitives';

export function UploadButton({
  className,
  disabled,
  onClick,
}: UploadButtonProps): JSX.Element {
  return (
    <Button
      disabled={disabled}
      className={className}
      size="small"
      onClick={onClick}
      variation="primary"
    >
      {translate('Browse files')}
    </Button>
  );
}
