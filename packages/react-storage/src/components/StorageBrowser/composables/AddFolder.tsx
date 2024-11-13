import React from 'react';

import { ButtonElement } from '../context/elements';
import { CLASS_BASE } from '../views/constants';

export interface AddFolderProps {
  onAddFolder?: () => void;
  isDisabled?: boolean;
  label?: string;
}

export const AddFolder = ({
  onAddFolder,
  isDisabled,
  label,
}: AddFolderProps): React.JSX.Element => (
  <ButtonElement
    className={`${CLASS_BASE}__add-folder`}
    disabled={isDisabled}
    onClick={onAddFolder}
    variant="add-folder"
  >
    {label}
  </ButtonElement>
);
