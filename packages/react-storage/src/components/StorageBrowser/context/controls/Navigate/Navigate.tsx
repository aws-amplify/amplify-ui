import React from 'react';

import { LocationData } from '../../actions/types';

const INITIAL_STATE: NavigateState = {
  initial: 'Home',
  location: {
    current: undefined,
    isLoadingInitialData: false,
    previousLocations: undefined,
  },
  locations: {
    isLoadingInitialData: false,
  },
};

export type NavigateAction =
  | { type: 'SELECT_LOCATION'; location: LocationData }
  | { type: 'DESELECT_LOCATION' }
  | { type: 'ENTER_LOCATION'; location: LocationData }
  | { type: 'EXIT_LOCATION' };

export interface NavigateState {
  location: {
    current: LocationData | undefined;
    isLoadingInitialData: boolean;
    previousLocations: LocationData[] | undefined;
  };
  locations: { isLoadingInitialData: boolean };
  // entrypoint name, e.g. "home"
  readonly initial: string;
}

export type NavigateStateContext = [
  state: NavigateState,
  handleUpdateState: (action: NavigateAction) => void,
];

export function navigateReducer(
  state: NavigateState,
  action: NavigateAction
): NavigateState {
  if (action.type === 'SELECT_LOCATION') {
    return {
      ...state,
      location: { ...state.location, current: action.location },
    };
  }
  return state;
}

// export function updateHistoryStateAction(
//   prevState: HistoryState,
//   { initial, next, type }: HistoryAction
// ): HistoryState {
//   switch (type) {
//     case 'enter': {
//       const { next: _next, previous } = prevState;
//       return { next, previous: [_next, ...previous] };
//     }
//     case 'exit': {
//       const [_next, ...previous] = prevState.previous;
//       if (initial === _next) {
//         return prevState;
//       }
//       return { next: _next, previous };
//     }
//     default:
//       throw new Error(`Invalid value of ${type} provided as \`type\``);
//   }
// }

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
