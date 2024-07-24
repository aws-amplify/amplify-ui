import React from 'react';

const INITIAL_STATE: DividerState = {};

export interface DividerState {}

type DividerAction = { type: '' };

export type DividerStateContext = [
  state: DividerState,
  handleUpdateState: (action: DividerAction) => void,
];

export function dividerReducer(
  state: DividerState,
  _action: DividerAction
): DividerState {
  return state;
}

export const DividerContext = React.createContext<
  DividerStateContext | undefined
>(undefined);

export function DividerProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const value = React.useReducer(dividerReducer, INITIAL_STATE);

  return (
    <DividerContext.Provider value={value}>{children}</DividerContext.Provider>
  );
}
