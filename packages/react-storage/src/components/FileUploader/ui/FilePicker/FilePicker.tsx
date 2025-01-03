import React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import { Button, ButtonProps } from '@aws-amplify/ui-react';

export type FilePickerProps = ButtonProps;

export function FilePicker({
  children,
  className = ComponentClassName.FileUploaderFilePicker,
  size = 'small',
  ...props
}: FilePickerProps): JSX.Element {
  return (
    <Button {...props} className={className} size={size}>
      {children}
    </Button>
  );
}
