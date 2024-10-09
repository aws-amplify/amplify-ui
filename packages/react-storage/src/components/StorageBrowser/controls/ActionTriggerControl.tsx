import React from 'react';

import { defaultActionKeys, displayText } from '../displayText/en';
import { ActionTrigger } from '../composables/ActionTrigger';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';

// FIXME: Temporarily get via props. Refactor later to get via view hook
interface TempProps extends ControlProps {
  actionKey: Extract<keyof typeof defaultActionKeys, 'CreateFolder' | 'Upload'>;
  disabled: boolean;
  handleAction: (handlerType: { type: 'process-start' }) => void;
}

export const ActionTriggerControl = ({
  className,
  actionKey,
  disabled,
  handleAction,
}: TempProps): React.JSX.Element => {
  const displayTextPrefix = defaultActionKeys[actionKey];

  const handleClick = () => {
    handleAction({ type: 'process-start' });
  };

  return (
    <ViewElement className={className}>
      <ActionTrigger
        disabled={disabled}
        label={
          displayText[`${displayTextPrefix}ActionTriggerLabel`] ??
          displayText.defaultActionTriggerLabel
        }
        onClick={handleClick}
      ></ActionTrigger>
    </ViewElement>
  );
};
