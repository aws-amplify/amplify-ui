import React from 'react';

type TitleAction = { type: '' };

export interface TitleState {}

export type TitleStateContext = [
  state: TitleState,
  handleUpdateState: (action: TitleAction) => void,
];

const INITIAL_STATE: TitleState = {};

export function titleReducer(
  state: TitleState,
  _action: TitleAction
): TitleState {
  return state;
}

export const TitleContext = React.createContext<TitleStateContext | undefined>(
  undefined
);

export function TitleProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const value = React.useReducer(titleReducer, INITIAL_STATE);

  return (
    <TitleContext.Provider value={value}>{children}</TitleContext.Provider>
  );
}
