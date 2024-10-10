import React from 'react';

import { locationActionsDefault } from './defaults';
import {
  LocationActions,
  LocationActionsAction,
  LocationActionsProviderProps,
  LocationActionsState,
  LocationActionsStateContext,
} from './types';

export const INITIAL_STATE: Omit<LocationActionsState, 'actions'> = {
  selected: { type: undefined, items: undefined },
};

const getInitialState = (
  actions: LocationActions = locationActionsDefault
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
      const selected = {
        ...state.selected,
        type: action.actionType,
        files: action.files,
      };
      return { ...state, selected };
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
