import React from 'react';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../../constants';
import {
  InputElement,
  ViewElement,
  LabelElement,
} from '../../context/elements/definitions';

export const LABEL_TEXT = 'Overwrite existing files';

interface OverwriteControlProps {
  defaultChecked?: boolean;
  disabled?: boolean;
  handleChange?: () => void;
}

export const OverwriteControl = ({
  defaultChecked,
  disabled,
  handleChange,
}: OverwriteControlProps): React.JSX.Element => (
  <ViewElement className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__overwrite`}>
    <InputElement
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={handleChange}
      type="checkbox"
      id="overwrite"
    />
    <LabelElement htmlFor="overwrite">{LABEL_TEXT}</LabelElement>
  </ViewElement>
);
