import React from 'react';

import { ButtonElement, IconElement } from '../context/elements';
import { AMPLIFY_CLASS_BASE } from '../views/constants';

const BLOCK_NAME = `${AMPLIFY_CLASS_BASE}__exit`;

export interface ActionExitProps {
  onExit?: () => void;
  isDisabled?: boolean;
  label?: string;
}

export const ActionExit = ({
  onExit,
  isDisabled = false,
  label,
}: ActionExitProps): React.JSX.Element => (
  <ButtonElement
    className={BLOCK_NAME}
    variant="exit"
    onClick={onExit}
    disabled={isDisabled}
  >
    <IconElement className={`${BLOCK_NAME}-icon`} variant="exit" /> {label}
  </ButtonElement>
);
