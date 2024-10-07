import React from 'react';
import { ConversationMessage } from '../types';

type ConversationToMessages = Record<string, ConversationMessage[]>;

export type RouteToConversations = Record<string, ConversationToMessages>;

interface ContextType {
  routeToConversationsMap: RouteToConversations;
  setRouteToConversationsMap: React.Dispatch<
    React.SetStateAction<RouteToConversations>
  >;
}

export const AIContext = React.createContext<ContextType | undefined>(
  undefined
);

export const useAIContext = (): ContextType => {
  const context = React.useContext(AIContext);
  const [routeToConversationsMap, setRouteToConversationsMap] =
    React.useState<RouteToConversations>({});

  if (context) {
    return context;
  }

  return { routeToConversationsMap, setRouteToConversationsMap };
};

/**
 * @experimental
 */
export const AIContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const context = useAIContext();
  return <AIContext.Provider value={context}>{children}</AIContext.Provider>;
};
