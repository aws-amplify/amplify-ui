import React from 'react';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../base';
import { ButtonElement } from '../elements';

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
    className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__add-folder`}
    disabled={isDisabled}
    onClick={onAddFolder}
    variant="add-folder"
  >
    {label}
  </ButtonElement>
);
