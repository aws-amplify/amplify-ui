import React from 'react';

import { ButtonElement } from '../context/elements';
import { CLASS_BASE } from '../views/constants';

export interface AddFilesProps {
  onAddFiles?: () => void;
  isDisabled?: boolean;
  label?: string;
}

export const AddFiles = ({
  onAddFiles,
  isDisabled,
  label,
}: AddFilesProps): React.JSX.Element => (
  <ButtonElement
    className={`${CLASS_BASE}__add-files`}
    disabled={isDisabled}
    onClick={onAddFiles}
    variant="add-files"
  >
    {label}
  </ButtonElement>
);
