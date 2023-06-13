import React from 'react';
import {
  Button,
  ComponentClassNames,
  ButtonProps,
} from '@aws-amplify/ui-react';

export type FilePickerProps = ButtonProps;

export function FilePicker({
  children,
  className = ComponentClassNames.StorageManagerFilePicker,
  size = 'small',
  ...props
}: FilePickerProps): JSX.Element {
  return (
    <Button {...props} className={className} size={size}>
      {children}
    </Button>
  );
}
