import React from 'react';

import { LocationData } from '../../actions/types';

type FolderName = `${string}/`;

const INITIAL_STATE: NavigateState = {
  location: {
    current: undefined,
    shouldRefresh: false,
  },
  history: {
    list: undefined,
    shouldRefresh: false,
  },
};

export type NavigateAction =
  | { type: 'SELECT_LOCATION'; location: LocationData }
  | { type: 'DESELECT_LOCATION' }
  | { type: 'ENTER_FOLDER'; name: FolderName }
  | { type: 'EXIT_FOLDER'; index: number };

export interface NavigateState {
  location: {
    current: LocationData | undefined;
    shouldRefresh: boolean;
  };
  history: {
    list: string[] | undefined;
    shouldRefresh: boolean;
  };
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
        ...state,
        location: {
          current: action.location,
          shouldRefresh: false,
        },
        history: {
          list: undefined,
          shouldRefresh: true,
        },
      };
    case 'DESELECT_LOCATION':
      return {
        location: {
          current: undefined,
          shouldRefresh: true,
        },
        history: {
          list: undefined,
          shouldRefresh: false,
        },
      };
    case 'ENTER_FOLDER': {
      const { name } = action;

      return {
        ...state,
        history: {
          list: [...(state.history.list ?? []), name],
          shouldRefresh: true,
        },
      };
    }
    case 'EXIT_FOLDER': {
      const { index } = action;
      const updatedHistory = state.history.list?.slice(0, index + 1);

      return {
        ...state,
        history: {
          list: updatedHistory,
          shouldRefresh: true,
        },
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
