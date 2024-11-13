import React from 'react';

import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ActionExit } from '../composables/ActionExit';
import { useActionExit } from './hooks/useActionExit';
import { ViewElement } from '../context/elements';

export const ActionExitControl = ({
  className,
}: ControlProps): React.JSX.Element => {
  const props = useActionExit();
  const ResolvedActionExit = useResolvedComposable(ActionExit, 'ActionExit');

  return (
    <ViewElement className={className}>
      <ResolvedActionExit {...props} />
    </ViewElement>
  );
};
