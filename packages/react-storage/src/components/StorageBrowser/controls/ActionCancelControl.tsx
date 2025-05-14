import React from 'react';

import { ActionCancel } from '../components/composables/ActionCancel';

import { useActionCancel } from './hooks/useActionCancel';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const ActionCancelControl = (): React.JSX.Element => {
  const props = useActionCancel();
  const Resolved = useResolvedComposable(ActionCancel, 'ActionCancel');

  return <Resolved {...props} />;
};
