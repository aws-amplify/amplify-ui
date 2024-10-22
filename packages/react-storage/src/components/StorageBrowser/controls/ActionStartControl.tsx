import React from 'react';

import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ActionStart } from '../composables/ActionStart';
import { useActionStart } from './hooks/useActionStart';

export const ActionStartControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const { props } = useActionStart();
  const ResolvedActionStart = useResolvedComposable(ActionStart, 'ActionStart');
  if (!props) {
    return null;
  }
  const { onClick, disabled, label } = props;

  return (
    <ResolvedActionStart
      onClick={onClick}
      disabled={disabled}
      label={label}
      className={className}
    />
  );
};
