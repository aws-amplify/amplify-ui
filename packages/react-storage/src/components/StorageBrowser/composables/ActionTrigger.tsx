import React from 'react';

import { ButtonElement } from '../context/elements';

interface ActionTriggerProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

export const ActionTrigger = ({
  label,
  disabled,
  onClick,
}: ActionTriggerProps): React.JSX.Element => (
  <ButtonElement variant="primary" onClick={onClick} disabled={disabled}>
    {label}
  </ButtonElement>
);
