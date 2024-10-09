import React from 'react';

import { defaultActionKeys, displayText } from '../displayText/en';
import { ActionCancel } from '../composables/ActionCancel';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';

// FIXME: Temporarily get via props. Refactor later to get via view hook
interface TempProps extends ControlProps {
  actionKey: Extract<keyof typeof defaultActionKeys, 'Upload'>;
  disabled: boolean;
  handleAction: (handlerType: { type: 'process-cancel' }) => void;
}

export const ActionCancelControl = ({
  className,
  actionKey,
  disabled,
  handleAction,
}: TempProps): React.JSX.Element => {
  const displayTextPrefix = defaultActionKeys[actionKey];

  const handleClick = () => {
    handleAction({ type: 'process-cancel' });
  };

  return (
    <ViewElement className={className}>
      <ActionCancel
        disabled={disabled}
        label={
          displayText[`${displayTextPrefix}ActionCancelLabel`] ??
          displayText.defaultActionCancelLabel
        }
        onClick={handleClick}
      ></ActionCancel>
    </ViewElement>
  );
};
