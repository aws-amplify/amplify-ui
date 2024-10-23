import React from 'react';

import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ActionCancel } from '../composables/ActionCancel';
import { useActionCancel } from './hooks/useActionCancel';

export const ActionCancelControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const { props } = useActionCancel();
  const ResolvedActionCancel = useResolvedComposable(
    ActionCancel,
    'ActionCancel'
  );
  if (!props) {
    return null;
  }
  const { onClick, ariaLabel, disabled, text } = props;

  return (
    <ResolvedActionCancel
      onClick={onClick}
      ariaLabel={ariaLabel}
      className={className}
      disabled={disabled}
      text={text}
    />
  );
};
