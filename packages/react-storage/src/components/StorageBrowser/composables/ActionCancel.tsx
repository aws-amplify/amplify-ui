import React from 'react';
import { ButtonElement, IconElement } from '../context/elements';
import { CLASS_BASE } from '../views/constants';

export interface ActionCancelProps {
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  text?: string;
}

export const ActionCancel = ({
  onClick,
  ariaLabel,
  className,
  disabled,
  text,
}: ActionCancelProps): React.JSX.Element => (
  <ButtonElement
    variant="cancel"
    className={className}
    onClick={onClick}
    aria-label={ariaLabel}
    disabled={disabled}
  >
    {text ?? <IconElement className={`${className}__icon`} variant="cancel" />}
  </ButtonElement>
);
