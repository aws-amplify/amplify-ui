import React from 'react';

import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ActionCancel } from '../composables/ActionCancel';
import { useActionCancel } from './hooks/useActionCancel';

export const ActionCancelControl = (): React.JSX.Element => {
  const props = useActionCancel();
  const ResolvedActionCancel = useResolvedComposable(
    ActionCancel,
    'ActionCancel'
  );

  return <ResolvedActionCancel {...props} />;
};
