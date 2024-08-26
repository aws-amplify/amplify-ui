import React from 'react';

import { LOCATION_ACTIONS_DEFAULT } from './defaults';
import {
  LocationActions,
  LocationActionsAction,
  LocationActionsProviderProps,
  LocationActionsState,
  LocationActionsStateContext,
} from './types';

const INITIAL_STATE: Omit<LocationActionsState, 'actions'> = {
  selected: { type: undefined, items: undefined },
};

const getInitialState = (
  actions: LocationActions = LOCATION_ACTIONS_DEFAULT
): LocationActionsState => ({
  ...INITIAL_STATE,
  actions,
});

export function locationActionsReducer(
  state: LocationActionsState,
  action: LocationActionsAction
): LocationActionsState {
  switch (action.type) {
    case 'SET_ACTION': {
      return {
        ...state,
        selected: { ...state.selected, type: action.payload },
      };
    }
    case 'CLEAR': {
      // reset state
      return getInitialState(state.actions);
    }
  }
  return state;
}

export const LocationActionsContext = React.createContext<
  LocationActionsStateContext | undefined
>(undefined);

export function LocationActionsProvider({
  actions,
  children,
}: LocationActionsProviderProps): React.JSX.Element {
  const value = React.useReducer(
    locationActionsReducer,
    actions,
    getInitialState
  );

  return (
    <LocationActionsContext.Provider value={value}>
      {children}
    </LocationActionsContext.Provider>
  );
}
