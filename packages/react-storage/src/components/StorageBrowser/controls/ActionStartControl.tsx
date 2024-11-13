import React from 'react';

import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ActionStart } from '../composables/ActionStart';
import { useActionStart } from './hooks/useActionStart';

export const ActionStartControl = (): React.JSX.Element => {
  const props = useActionStart();
  const ResolvedActionStart = useResolvedComposable(ActionStart, 'ActionStart');

  return <ResolvedActionStart {...props} />;
};
