import React from 'react';

const INITIAL_STATE: MessageState = {};

export interface MessageState {}

type MessageAction = { type: '' };

export type MessageStateContext = [
  state: MessageState,
  handleUpdateState: (action: MessageAction) => void,
];

export function messageReducer(
  state: MessageState,
  _action: MessageAction
): MessageState {
  return state;
}

export const MessageContext = React.createContext<
  MessageStateContext | undefined
>(undefined);

export function MessageProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const value = React.useReducer(messageReducer, INITIAL_STATE);

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}
