import React from 'react';
import { ActionState, useDataState } from '@aws-amplify/ui-react-core';

export interface HistoryState {
  currentValue: string;
  previous: string[];
}

export type UpdateHistoryStateActionInput =
  | { currentValue: string; type: 'enter' }
  | { currentValue: never; type: 'exit' };

export type UseHistoryState = [
  ActionState<HistoryState>,
  (input: UpdateHistoryStateActionInput) => void,
];

export const updateHistoryStateAction = (
  prevState: HistoryState,
  { currentValue, type }: UpdateHistoryStateActionInput
): HistoryState => {
  switch (type) {
    case 'enter': {
      const { currentValue: _currentValue, previous } = prevState;
      return { currentValue, previous: [_currentValue, ...previous] };
    }
    case 'exit': {
      const [currentValue, ...previous] = prevState.previous;
      return { currentValue, previous };
    }

    default: {
      // eslint-disable-next-line no-console
      console.error(
        `\`useStorageBrowser('locationHistory')\`: Invalid value of ${type} provided as \`type\``
      );

      return prevState;
    }
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
    currentValue: 'Home',
    previous: [],
  });

  return (
    <HistoryStateContext.Provider value={state}>
      {children}
    </HistoryStateContext.Provider>
  );
};
