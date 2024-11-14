import React from 'react';

import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ActionExit } from '../composables/ActionExit';
import { useActionExit } from './hooks/useActionExit';

export const ActionExitControl = (): React.JSX.Element => {
  const props = useActionExit();
  const ResolvedActionExit = useResolvedComposable(ActionExit, 'ActionExit');

  return <ResolvedActionExit {...props} />;
};
