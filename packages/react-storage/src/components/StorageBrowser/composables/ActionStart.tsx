import React from 'react';
import { ButtonElement } from '../context/elements';

export interface ActionStartProps {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const ActionStart = ({
  onClick,
  disabled,
  label,
  className,
}: ActionStartProps): React.JSX.Element => (
  <ButtonElement
    variant="primary"
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </ButtonElement>
);
