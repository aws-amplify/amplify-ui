import React from 'react';

import { ActionStart } from '../composables/ActionStart';

import { useActionStart } from './hooks/useActionStart';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const ActionStartControl = (): React.JSX.Element => {
  const props = useActionStart();
  const Resolved = useResolvedComposable(ActionStart, 'ActionStart');

  return <Resolved {...props} />;
};
