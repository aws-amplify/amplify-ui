import React from 'react';
import { ButtonElement } from '../context/elements';
import { CLASS_BASE } from '../views/constants';

export interface ActionStartProps {
  onClick?: () => void;
  isDisabled?: boolean;
  label?: string;
}

export const ActionStart = ({
  onClick,
  isDisabled,
  label,
}: ActionStartProps): React.JSX.Element => (
  <ButtonElement
    variant="primary"
    className={`${CLASS_BASE}__action-start`}
    onClick={onClick}
    disabled={isDisabled}
  >
    {label}
  </ButtonElement>
);
