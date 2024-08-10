import React from 'react';

type RefreshAction = { type: 'START' } | { type: 'DONE' };

export interface RefreshState {
  isRefreshing: boolean;
}

export type RefreshStateContext = [
  state: RefreshState,
  handleUpdateState: (action: RefreshAction) => void,
];

const INITIAL_STATE: RefreshState = {
  isRefreshing: false,
};

export function refreshReducer(
  state: RefreshState,
  action: RefreshAction
): RefreshState {
  if (action.type === 'START') {
    return { isRefreshing: true };
  } else if (action.type === 'DONE') {
    return { isRefreshing: false };
  }
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
