import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

import { assertIsLocationData } from '../../../validators';
import { LocationData } from '../../../actions';

export const ERROR_MESSAGE =
  'Invalid `location` value provided as initial value to `HistoryProvider.';

export const DEFAULT_STATE: HistoryState = {
  current: undefined,
  previous: undefined,
};

export type HistoryActionType =
  | { type: 'NAVIGATE'; destination: LocationData }
  | { type: 'RESET_HISTORY' };

export interface HistoryState {
  current: LocationData | undefined;
  previous: LocationData[] | undefined;
}

export type HistoryStateContext = [
  HistoryState,
  (action: HistoryActionType) => void,
];

export interface HistoryProviderProps {
  children?: React.ReactNode;
  location?: LocationData;
}

function handleAction(
  state: HistoryState,
  action: HistoryActionType
): HistoryState {
  switch (action.type) {
    case 'NAVIGATE': {
      const { destination } = action;

      if (state.current?.id === destination.id) return state;

      if (!state.previous?.length) {
        return { current: destination, previous: [destination] };
      }

      const itemIndex = state.previous.findIndex(
        ({ id }) => id === destination.id
      );
      const previous =
        itemIndex === -1
          ? [...state.previous, destination]
          : state.previous.slice(0, itemIndex + 1);

      return { current: destination, previous };
    }
    case 'RESET_HISTORY': {
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
  if (current) {
    assertIsLocationData(current, ERROR_MESSAGE);
  }

  const value = React.useReducer(
    handleAction,
    current ? { current, previous: [current] } : DEFAULT_STATE
  );

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}
