import React from 'react';

import { LocationAccess } from '../../types';
import { parseLocationAccess } from './utils';

export const INITIAL_STATE = { location: undefined, history: [], path: '' };

interface Entry {
  position: number;
  prefix: string;
}

export type NavigateAction =
  | { type: 'ACCESS_LOCATION'; location: LocationAccess }
  | { type: 'NAVIGATE'; entry: Entry }
  | { type: 'EXIT' };

export interface NavigateState {
  location: LocationAccess | undefined;
  history: Entry[];
  path: string;
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

      return { location, history: [{ prefix, position: 0 }], path: prefix };
    }
    case 'NAVIGATE': {
      const { prefix, position } = action.entry;

      if (position === 0)
        return { ...state, history: [{ prefix, position }], path: prefix };

      const isExistingEntry = position <= state.history.length - 1;
      const history = isExistingEntry
        ? state.history.slice(0, position + 1)
        : [...state.history, { prefix, position: state.history.length }];

      const path = history.reduce(
        (acc: string, entry) => `${acc}${entry.prefix}`,
        ''
      );

      return { ...state, history, path };
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
