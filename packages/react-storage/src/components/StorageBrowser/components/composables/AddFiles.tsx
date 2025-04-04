import React from 'react';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../base';
import { ButtonElement } from '../elements';

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
    className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__add-files`}
    disabled={isDisabled}
    onClick={onAddFiles}
    variant="add-files"
  >
    {label}
  </ButtonElement>
);
