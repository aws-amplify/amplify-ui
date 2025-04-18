import React from 'react';

import { ActionDestination } from '../components/composables/ActionDestination';

import { useActionDestination } from './hooks/useActionDestination';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const ActionDestinationControl = (): React.JSX.Element => {
  const props = useActionDestination();

  const Resolved = useResolvedComposable(
    ActionDestination,
    'ActionDestination'
  );

  return <Resolved {...props} />;
};
