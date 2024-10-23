import React from 'react';

import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ActionStart } from '../composables/ActionStart';
import { useActionStart } from './hooks/useActionStart';
import { ViewElement } from '../context/elements';

export const ActionStartControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const { props } = useActionStart();
  const ResolvedActionStart = useResolvedComposable(ActionStart, 'ActionStart');
  if (!props) {
    return null;
  }

  return (
    <ViewElement className={className}>
      <ResolvedActionStart {...props} />
    </ViewElement>
  );
};
