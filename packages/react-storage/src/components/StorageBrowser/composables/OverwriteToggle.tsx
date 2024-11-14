import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../constants';
import { InputElement, ViewElement, LabelElement } from '../context/elements/';

const OVERWRITE_TOGGLE_ID = 'overwrite-toggle';

export interface OverwriteToggleProps {
  isDisabled?: boolean;
  isOverwritingEnabled?: boolean;
  label?: string;
  onToggle?: () => void;
}

export const OverwriteToggle = ({
  isOverwritingEnabled,
  isDisabled,
  label,
  onToggle,
}: OverwriteToggleProps): React.JSX.Element => (
  <ViewElement className={`${STORAGE_BROWSER_BLOCK}__overwrite-toggle`}>
    <InputElement
      checked={isOverwritingEnabled}
      disabled={isDisabled}
      id={OVERWRITE_TOGGLE_ID}
      onChange={onToggle}
      type="checkbox"
    />
    <LabelElement htmlFor={OVERWRITE_TOGGLE_ID}>{label}</LabelElement>
  </ViewElement>
);
