import React from 'react';

import { ActionDestination } from '../composables/ActionDestination';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useActionDestination } from './hooks/useActionDestination';

export const ActionDestinationControl = (): React.JSX.Element => {
  const props = useActionDestination();

  const ResolvedActionDestination = useResolvedComposable(
    ActionDestination,
    'ActionDestination'
  );

  return <ResolvedActionDestination {...props} />;
};
