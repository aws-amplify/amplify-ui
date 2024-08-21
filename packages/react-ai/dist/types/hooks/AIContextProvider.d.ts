import React from 'react';
import { ConversationMessage } from '../types';
type ConversationToMessages = Record<string, ConversationMessage[]>;
export type RouteToConversations = Record<string, ConversationToMessages>;
interface ContextType {
    routeToConversationsMap: RouteToConversations;
    setRouteToConversationsMap: React.Dispatch<React.SetStateAction<RouteToConversations>>;
}
export declare const AIContext: React.Context<ContextType | undefined>;
export declare const useAIContext: () => ContextType;
export declare const AIContextProvider: ({ children, }: {
    children: React.ReactNode;
}) => React.ReactNode;
export {};
