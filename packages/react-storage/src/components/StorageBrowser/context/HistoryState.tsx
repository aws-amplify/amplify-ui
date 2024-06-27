import React from 'react';
import { ActionState, useDataState } from '@aws-amplify/ui-react-core';

export interface HistoryState {
  current: string;
  previous: string[];
}

export type HistoryAction =
  | { current: string; type: 'enter' }
  | { current: never; type: 'exit' };

export type UseHistoryState = [
  ActionState<HistoryState>,
  (input: HistoryAction) => void,
];

export const updateHistoryStateAction = (
  prevState: HistoryState,
  { current, type }: HistoryAction
): HistoryState => {
  switch (type) {
    case 'enter': {
      const { current: _current, previous } = prevState;
      return { current, previous: [_current, ...previous] };
    }
    case 'exit': {
      const [current, ...previous] = prevState.previous;
      return { current, previous };
    }
    default:
      throw new Error(`Invalid value of ${type} provided as \`type\``);
  }
};

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
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const state = useDataState(updateHistoryStateAction, {
    current: 'Home',
    previous: [],
  });

  return (
    <HistoryStateContext.Provider value={state}>
      {children}
    </HistoryStateContext.Provider>
  );
};
