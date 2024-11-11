import React from 'react';

import { CLASS_BASE } from '../views/constants';
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
  <ViewElement className={`${CLASS_BASE}__overwrite-toggle`}>
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
