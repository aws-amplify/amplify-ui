import React from 'react';

import { ActionsList } from '../composables/ActionsList';

import { useActionsList } from './hooks/useActionsList';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const ActionsListControl = (): React.JSX.Element => {
  const props = useActionsList();
  const Resolved = useResolvedComposable(ActionsList, 'ActionsList');

  return <Resolved {...props} />;
};
