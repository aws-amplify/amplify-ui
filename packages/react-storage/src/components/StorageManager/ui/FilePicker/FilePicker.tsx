import React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import type { ButtonProps } from '@aws-amplify/ui-react';
import { Button } from '@aws-amplify/ui-react';

export type FilePickerProps = ButtonProps;

export function FilePicker({
  children,
  className = ComponentClassName.StorageManagerFilePicker,
  size = 'small',
  ...props
}: FilePickerProps): React.JSX.Element {
  return (
    <Button {...props} className={className} size={size}>
      {children}
    </Button>
  );
}
