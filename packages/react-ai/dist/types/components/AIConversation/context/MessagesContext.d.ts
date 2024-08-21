import React from 'react';
import { ConversationMessage } from '../../../types';
type MessagesContextProps = ConversationMessage[] | undefined;
export declare const MessagesContext: React.Context<MessagesContextProps>;
export declare const RoleContext: React.Context<"user" | "assistant" | undefined>;
export declare const MessagesProvider: ({ children, messages, }: {
    children?: React.ReactNode;
    messages: ConversationMessage[];
}) => JSX.Element;
export {};
