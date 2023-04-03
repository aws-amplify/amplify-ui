import React from 'react';
import { Button, ComponentClassNames } from '@aws-amplify/ui-react';

export type FilePickerProps = Parameters<typeof Button>[0] & {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

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
