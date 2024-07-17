import React from 'react';
import { ConversationMessage } from '../types';

type MessagesContextProps = ConversationMessage[] | undefined;

export const MessagesContext =
  React.createContext<MessagesContextProps>(undefined);

export const MessagesProvider = ({
  children,
  messages,
}: {
  children?: React.ReactNode;
  messages: ConversationMessage[];
}): JSX.Element => {
  return (
    <MessagesContext.Provider value={messages}>
      {children}
    </MessagesContext.Provider>
  );
};
