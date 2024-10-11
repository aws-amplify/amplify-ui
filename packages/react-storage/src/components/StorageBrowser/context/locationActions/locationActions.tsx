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
    case 'TOGGLE_SELECTED_ITEM': {
      const hasItem = !!state.selected.items?.some(
        (item) => item.key === action.item.key
      );
      const selectedItems = hasItem
        ? {
            items: state.selected.items?.filter(
              (item) => item.key !== action.item.key
            ),
          }
        : {
            items: [
              ...(state.selected.items ? state.selected.items : []),
              action.item,
            ],
          };
      const selected = { ...state.selected, ...selectedItems };
      return { ...state, selected };
    }
    case 'TOGGLE_SELECTED_ITEMS': {
      const selected = { ...state.selected, items: [...(action.items ?? [])] };
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
