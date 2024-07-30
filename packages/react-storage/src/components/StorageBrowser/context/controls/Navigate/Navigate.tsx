import React from 'react';

import { LocationData, FolderName } from '../../actions/types';

const INITIAL_STATE: NavigateState = {
  location: undefined,
  history: undefined,
};

export type NavigateAction =
  | { type: 'SELECT_LOCATION'; location: LocationData }
  | { type: 'DESELECT_LOCATION' }
  | { type: 'ENTER_FOLDER'; name: FolderName }
  | { type: 'EXIT_FOLDER'; index: number };

export interface NavigateState {
  location: LocationData | undefined;
  history: FolderName[] | undefined;
}

export type NavigateStateContext = [
  state: NavigateState,
  handleUpdateState: (action: NavigateAction) => void,
];

export function navigateReducer(
  state: NavigateState,
  action: NavigateAction
): NavigateState {
  switch (action.type) {
    case 'SELECT_LOCATION':
      return {
        location: action.location,
        history: undefined,
      };
    case 'DESELECT_LOCATION':
      return {
        location: undefined,
        history: undefined,
      };
    case 'ENTER_FOLDER': {
      const { name } = action;

      return {
        ...state,
        history: [...(state.history ?? []), name],
      };
    }
    case 'EXIT_FOLDER': {
      const { index } = action;
      const updatedHistory = state.history?.slice(0, index + 1);

      return {
        ...state,
        history: updatedHistory,
      };
    }
  }
}

export const NavigateContext = React.createContext<
  NavigateStateContext | undefined
>(undefined);

export function NavigateProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const value = React.useReducer(navigateReducer, INITIAL_STATE);

  return (
    <NavigateContext.Provider value={value}>
      {children}
    </NavigateContext.Provider>
  );
}
