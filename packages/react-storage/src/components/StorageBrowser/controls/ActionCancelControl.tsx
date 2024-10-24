import React from 'react';

import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ActionCancel } from '../composables/ActionCancel';
import { useActionCancel } from './hooks/useActionCancel';
import { ViewElement } from '../context/elements';

export const ActionCancelControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const props = useActionCancel();
  const ResolvedActionCancel = useResolvedComposable(
    ActionCancel,
    'ActionCancel'
  );

  return (
    <ViewElement className={className}>
      <ResolvedActionCancel {...props} />
    </ViewElement>
  );
};
