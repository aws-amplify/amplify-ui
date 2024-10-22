import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

import { LocationData as _LocationData } from '../../../actions';

// temp: LocationData will be extended to include id during integration
interface LocationData extends _LocationData {
  id: string;
}

export const DEFAULT_STATE: HistoryState = {
  current: undefined,
  history: undefined,
};

export type HistoryAction =
  | { type: 'NAVIGATE'; destination: LocationData }
  | { type: 'RESET' };

export interface HistoryState {
  current: LocationData | undefined;
  history: LocationData[] | undefined;
}

export type HistoryStateContext = [
  HistoryState,
  (action: HistoryAction) => void,
];

export interface HistoryProviderProps {
  children?: React.ReactNode;
  location?: LocationData;
}

function handleAction(
  state: HistoryState,
  action: HistoryAction
): HistoryState {
  switch (action.type) {
    case 'NAVIGATE': {
      const { destination } = action;

      if (state.current?.id === destination.id) return state;

      if (!state.history?.length) {
        return { current: destination, history: [destination] };
      }

      const itemIndex = state.history.findIndex(
        ({ id }) => id === destination.id
      );
      const history =
        itemIndex === -1
          ? [...state.history, destination]
          : state.history.slice(0, itemIndex + 1);

      return { current: destination, history };
    }
    case 'RESET': {
      return DEFAULT_STATE;
    }
  }
}

const defaultValue: HistoryStateContext = [DEFAULT_STATE, noop];
export const { HistoryContext, useHistory } = createContextUtilities({
  contextName: 'History',
  defaultValue,
});

export function HistoryProvider({
  children,
  location: current,
}: HistoryProviderProps): React.JSX.Element {
  // @todo: add full location validation
  if (current && !current?.id) throw new Error('invalid location');

  const value = React.useReducer(
    handleAction,
    current ? { current, history: [current] } : DEFAULT_STATE
  );

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}
