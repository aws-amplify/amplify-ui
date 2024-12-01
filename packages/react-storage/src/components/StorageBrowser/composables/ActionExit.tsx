import React from 'react';

import { ButtonElement, IconElement } from '../context/elements';
import { STORAGE_BROWSER_BLOCK } from '../constants';

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
    className={`${STORAGE_BROWSER_BLOCK}__exit`}
    variant="exit"
    onClick={onExit}
    disabled={isDisabled}
  >
    <IconElement
      className={`${STORAGE_BROWSER_BLOCK}__action-exit-icon`}
      variant="exit"
    />{' '}
    {label}
  </ButtonElement>
);
