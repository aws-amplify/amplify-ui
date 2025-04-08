import React from 'react';

import { ActionExit } from '../components/composables/ActionExit';

import { useActionExit } from './hooks/useActionExit';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const ActionExitControl = (): React.JSX.Element => {
  const props = useActionExit();
  const Resolved = useResolvedComposable(ActionExit, 'ActionExit');

  return <Resolved {...props} />;
};
