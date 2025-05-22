import React from 'react';
import type { ConversationMessage } from '../../../types';

type MessagesContextProps = ConversationMessage[] | undefined;

export const MessagesContext =
  React.createContext<MessagesContextProps>(undefined);

// role of the user sending the message, assistant or user
export const RoleContext = React.createContext<
  ConversationMessage['role'] | undefined
>(undefined);

export const MessagesProvider = ({
  children,
  messages,
}: {
  children?: React.ReactNode;
  messages: ConversationMessage[];
}): React.JSX.Element => {
  return (
    <MessagesContext.Provider value={messages}>
      {children}
    </MessagesContext.Provider>
  );
};
