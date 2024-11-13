import React from 'react';

import { ButtonElement } from '../context/elements';
import { AMPLIFY_CLASS_BASE } from '../views/constants';

export interface ActionCancelProps {
  onCancel?: () => void;
  isDisabled?: boolean;
  label?: string;
}

export const ActionCancel = ({
  onCancel,
  isDisabled,
  label,
}: ActionCancelProps): React.JSX.Element => (
  <ButtonElement
    variant="cancel"
    className={`${AMPLIFY_CLASS_BASE}__cancel`}
    onClick={onCancel}
    disabled={isDisabled}
  >
    {label}
  </ButtonElement>
);
