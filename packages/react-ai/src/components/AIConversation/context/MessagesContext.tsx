import React from 'react';
import { Message } from '../types';

type MessagesContextProps = Message[] | undefined;

export const MessagesContext =
  React.createContext<MessagesContextProps>(undefined);

export const MessagesProvider = ({
  children,
  messages,
}: {
  children?: React.ReactNode;
  messages: Message[];
}): JSX.Element => {
  return (
    <MessagesContext.Provider value={messages}>
      {children}
    </MessagesContext.Provider>
  );
};
