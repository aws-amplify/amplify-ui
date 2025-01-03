import React from 'react';
import { IconClose, useIcons } from '@aws-amplify/ui-react/internal';
import { Button, View, VisuallyHidden } from '@aws-amplify/ui-react';
import { FileRemoveButtonProps } from './types';

export const FileRemoveButton = ({
  altText,
  onClick,
}: FileRemoveButtonProps): JSX.Element => {
  const icons = useIcons('storageManager');
  return (
    <Button
      size="small"
      onClick={onClick}
      testId="storage-manager-remove-button"
    >
      <VisuallyHidden>{altText}</VisuallyHidden>
      <View as="span" aria-hidden fontSize="medium">
        {icons?.remove ?? <IconClose />}
      </View>
    </Button>
  );
};
