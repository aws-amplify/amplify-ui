import React from 'react';
import { ButtonElement, IconElement } from '../context/elements';
import { CLASS_BASE } from '../views/constants';

export interface ActionCancelProps {
  onCancel?: () => void;
  ariaLabel?: string;
  isDisabled?: boolean;
  text?: string;
}

export const ActionCancel = ({
  onCancel,
  ariaLabel,
  isDisabled,
  text,
}: ActionCancelProps): React.JSX.Element => (
  <ButtonElement
    variant="cancel"
    className={`${CLASS_BASE}__action-cancel`}
    onClick={onCancel}
    aria-label={ariaLabel}
    disabled={isDisabled}
  >
    {text ?? (
      <IconElement
        className={`${CLASS_BASE}__action-cancel-icon`}
        variant="cancel"
      />
    )}
  </ButtonElement>
);
