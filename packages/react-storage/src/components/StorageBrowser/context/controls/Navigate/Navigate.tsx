import React from 'react';

import { LocationData } from '../../actions/types';

type FolderName = `${string}/`;

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
  history: string[] | undefined;
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
    case 'SELECT_LOCATION': {
      const { location } = action;
      return { ...state, location };
    }
    case 'DESELECT_LOCATION': {
      return state;
    }
    case 'ENTER_FOLDER': {
      const { name } = action;
      const { location } = state;
      const { bucket, prefix, permission, type } = location!;

      // eslint-disable-next-line no-console
      console.log('ENTER_FOLDER prefix', prefix);

      const scope = `s3://${bucket}/${name}*`;
      // eslint-disable-next-line no-console
      console.log('new scope', scope);

      return {
        ...state,
        location: { bucket, prefix: name, permission, scope, type },
      };
    }
    case 'EXIT_FOLDER': {
      return state;
      // const { index } = action;
      // const updatedHistory = state.history.list?.slice(0, index + 1);

      // return {
      //   ...state,
      //   history: {
      //     list: updatedHistory,
      //     shouldRefresh: true,
      //   },
      // };
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
