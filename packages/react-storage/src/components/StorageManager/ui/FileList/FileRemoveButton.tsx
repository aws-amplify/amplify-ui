import React from 'react';
import { Button, Icon, VisuallyHidden, useTheme } from '@aws-amplify/ui-react';
import { FileRemoveButtonProps } from './types';

export const FileRemoveButton = ({
  altText,
  onClick,
}: FileRemoveButtonProps): JSX.Element => {
  const { icons } = useTheme();
  return (
    <Button size="small" onClick={onClick}>
      <VisuallyHidden>{altText}</VisuallyHidden>
      <Icon {...icons.storageManager.remove} aria-hidden fontSize="medium" />
    </Button>
  );
};
