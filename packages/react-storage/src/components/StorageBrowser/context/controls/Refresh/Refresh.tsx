import React from 'react';

type RefreshAction = { type: 'START' } | { type: 'DONE' };

export interface RefreshState {
  isLoadingData: boolean;
}

export type RefreshStateContext = [
  state: RefreshState,
  handleUpdateState: (action: RefreshAction) => void,
];

const INITIAL_STATE: RefreshState = {
  isLoadingData: false,
};

export function refreshReducer(
  state: RefreshState,
  _action: RefreshAction
): RefreshState {
  return state;
}

export const RefreshContext = React.createContext<
  RefreshStateContext | undefined
>(undefined);

export function RefreshProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const value = React.useReducer(refreshReducer, INITIAL_STATE);

  return (
    <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>
  );
}
