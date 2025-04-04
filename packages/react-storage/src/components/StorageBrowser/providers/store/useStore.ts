import React from 'react';

import { ActionTypeAction, useActionType } from './actionType';
import { LocationActionType, LocationState, useLocation } from './location';

export interface UseStoreState {
  actionType: string | undefined;
  location: LocationState;
}

export type HandleStoreAction = (
  action: ActionTypeAction | LocationActionType
) => void;

export function useStore(): [UseStoreState, HandleStoreAction] {
  const [actionType, dispatchActionType] = useActionType();
  const [location, dispatchLocationAction] = useLocation();

  const dispatchHandler: HandleStoreAction = React.useCallback(
    (action) => {
      switch (action.type) {
        case 'NAVIGATE':
        case 'RESET_LOCATION': {
          dispatchLocationAction(action);
          break;
        }
        case 'SET_ACTION_TYPE':
        case 'RESET_ACTION_TYPE': {
          dispatchActionType(action);
          break;
        }
      }
    },
    [dispatchActionType, dispatchLocationAction]
  );

  return [{ actionType, location }, dispatchHandler];
}
