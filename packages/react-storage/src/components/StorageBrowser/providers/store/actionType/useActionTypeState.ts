import React from 'react';

import {
  ActionTypeAction,
  ActionTypeStateContext,
  HandleActionTypeAction,
} from './types';

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

export function useActionTypeState(
  initialState?: string
): ActionTypeStateContext {
  const [actionType, setActionType] = React.useState(initialState);

  const handler: HandleActionTypeAction = React.useCallback(
    (action) => setActionType(handleAction(action)),
    []
  );

  return [actionType, handler];
}
