import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

import { ActionTypeProviderProps, ActionTypeStateContext } from './types';
import { useActionTypeState } from './useActionTypeState';

const defaultValue: ActionTypeStateContext = [undefined, noop];
export const { ActionTypeContext, useActionType } = createContextUtilities({
  contextName: 'ActionType',
  defaultValue,
});

export function ActionTypeProvider({
  actionType,
  children,
}: ActionTypeProviderProps): React.JSX.Element {
  const value = useActionTypeState(actionType);
  return (
    <ActionTypeContext.Provider value={value}>
      {children}
    </ActionTypeContext.Provider>
  );
}
