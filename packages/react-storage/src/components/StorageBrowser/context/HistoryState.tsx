import React from 'react';
import { DataState, useDataState } from '@aws-amplify/ui-react-core';

export interface HistoryState {
  next: string;
  previous: string[];
}

export type HistoryAction =
  | { next: string; initial?: never; type: 'enter' }
  | { next?: never; initial: string; type: 'exit' };

export type UseHistoryState = [
  DataState<HistoryState>,
  (input: HistoryAction) => void,
];

export function updateHistoryStateAction(
  prevState: HistoryState,
  { initial, next, type }: HistoryAction
): HistoryState {
  switch (type) {
    case 'enter': {
      const { next: _next, previous } = prevState;
      return { next, previous: [_next, ...previous] };
    }
    case 'exit': {
      const [_next, ...previous] = prevState.previous;
      if (initial === _next) {
        return prevState;
      }
      return { next: _next, previous };
    }
    default:
      throw new Error(`Invalid value of ${type} provided as \`type\``);
  }
}

const HistoryStateContext = React.createContext<UseHistoryState | undefined>(
  undefined
);

export const useHistoryState = (): UseHistoryState => {
  const context = React.useContext(HistoryStateContext);
  if (!context) throw new Error('Must be called inside PROVIDER_NAME_HERE');
  return context;
};

export const HistoryStateProvider = ({
  children,
  initialState,
}: {
  children?: React.ReactNode;
  initialState: HistoryState;
}): JSX.Element => {
  const state = useDataState(updateHistoryStateAction, initialState);

  return (
    <HistoryStateContext.Provider value={state}>
      {children}
    </HistoryStateContext.Provider>
  );
};
