import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

export type ActionTypeAction =
  | { type: 'SET_ACTION_TYPE'; actionType: string }
  | { type: 'RESET' };

export type HandleActionTypeAction = (event: ActionTypeAction) => void;

export type ActionTypeStateContext = [
  string | undefined,
  HandleActionTypeAction,
];

export interface ActionTypeProviderProps {
  actionType?: string;
  children?: React.ReactNode;
}

const handleAction = (event: ActionTypeAction): string | undefined => {
  switch (event.type) {
    case 'SET_ACTION_TYPE': {
      return event.actionType;
    }
    case 'RESET': {
      return undefined;
    }
  }
};

function useActionTypeState(initialState?: string): ActionTypeStateContext {
  const [actionType, setActionType] = React.useState(initialState);

  const handler: HandleActionTypeAction = React.useCallback(
    (action) => setActionType(handleAction(action)),
    []
  );

  return [actionType, handler];
}

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
