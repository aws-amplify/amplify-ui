import React from 'react';
import { IconClose } from '@aws-amplify/ui-react/internal';
import { Button, View, VisuallyHidden, useIcons } from '@aws-amplify/ui-react';
import { FileRemoveButtonProps } from './types';

export const FileRemoveButton = ({
  altText,
  onClick,
}: FileRemoveButtonProps): JSX.Element => {
  const icons = useIcons();
  return (
    <Button size="small" onClick={onClick}>
      <VisuallyHidden>{altText}</VisuallyHidden>
      <View as="span" aria-hidden fontSize="medium">
        {icons?.storageManager?.remove ?? <IconClose />}
      </View>
    </Button>
  );
};
