import React from 'react';

import { ButtonElement } from '../context/elements';
import { AMPLIFY_CLASS_BASE } from '../views/constants';

export interface ActionStartProps {
  onStart?: () => void;
  isDisabled?: boolean;
  label?: string;
}

export const ActionStart = ({
  onStart,
  isDisabled,
  label,
}: ActionStartProps): React.JSX.Element => (
  <ButtonElement
    variant="primary"
    className={`${AMPLIFY_CLASS_BASE}__start`}
    onClick={onStart}
    disabled={isDisabled}
  >
    {label}
  </ButtonElement>
);
