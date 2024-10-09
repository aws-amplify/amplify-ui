import React from 'react';

import { ButtonElement } from '../context/elements';

interface ActionCancelProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

export const ActionCancel = ({
  label,
  disabled,
  onClick,
}: ActionCancelProps): React.JSX.Element => (
  <ButtonElement variant="cancel" onClick={onClick} disabled={disabled}>
    {label}
  </ButtonElement>
);
