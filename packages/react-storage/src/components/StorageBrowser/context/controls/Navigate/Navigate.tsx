import React from 'react';

import { LocationAccess } from '../../types';
import { parseLocationAccess } from './utils';

const INITIAL_STATE = { location: undefined, history: [] };

export type NavigateAction =
  | { type: 'ACCESS_LOCATION'; location: LocationAccess }
  | { type: 'NAVIGATE'; prefix: string }
  | { type: 'EXIT' };

export interface NavigateState {
  location: LocationAccess | undefined;
  history: string[];
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
    case 'ACCESS_LOCATION': {
      const { location } = action;
      const { prefix } = parseLocationAccess(location);

      return { location, history: [prefix] };
    }
    case 'NAVIGATE': {
      const { prefix } = action;

      // TODO: problematic if folder names in the history have the same prefix
      const position = state.history.indexOf(prefix);

      if (position === 0) return { ...state, history: [prefix] };

      const history =
        position === -1
          ? [...state.history, prefix]
          : state.history.slice(0, position + 1);

      return { ...state, history };
    }
    case 'EXIT': {
      return INITIAL_STATE;
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
