import React from 'react';
import { IconClose } from '../../../../primitives/Icon/internal';
import { Button, VisuallyHidden } from '../../../../primitives';
import { FileState } from '../types';
import { FileActionsProps } from './types';

export const FileActions = ({
  file,
  fileState,
  onCancel,
}: FileActionsProps): JSX.Element => {
  switch (fileState) {
    case FileState.SUCCESS:
      return null;
    default:
      return (
        <Button size="small" onClick={onCancel}>
          <VisuallyHidden>Remove file name {file.name}</VisuallyHidden>
          <IconClose aria-hidden fontSize="medium" />
        </Button>
      );
  }
};
