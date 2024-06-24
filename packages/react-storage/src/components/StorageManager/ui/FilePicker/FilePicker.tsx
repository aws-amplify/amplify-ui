import React from 'react';

import { storageManagerClasses } from '@aws-amplify/ui';
import { Button, ButtonProps } from '@aws-amplify/ui-react';

export type FilePickerProps = ButtonProps;

export function FilePicker({
  children,
  className = storageManagerClasses({ _element: 'file__picker' }),
  size = 'small',
  ...props
}: FilePickerProps): JSX.Element {
  return (
    <Button {...props} className={className} size={size}>
      {children}
    </Button>
  );
}
