import React from 'react';
import { IconClose } from '@aws-amplify/ui-react/internal';
import { Button, VisuallyHidden } from '@aws-amplify/ui-react';
import { FileRemoveButtonProps } from './types';

export const FileRemoveButton = ({
  altText,
  onClick,
}: FileRemoveButtonProps): JSX.Element => {
  return (
    <Button size="small" onClick={onClick}>
      <VisuallyHidden>{altText}</VisuallyHidden>
      <IconClose aria-hidden fontSize="medium" />
    </Button>
  );
};
