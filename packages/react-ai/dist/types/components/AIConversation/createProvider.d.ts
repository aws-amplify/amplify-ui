import React from 'react';
import { AIConversationElements } from './context/elements';
import { AIConversationInput, AIConversationProps } from './types';
export default function createProvider<T extends Partial<AIConversationElements>>({ elements, actions, suggestedPrompts, responseComponents, variant, }: Pick<AIConversationInput<T>, 'elements' | 'actions' | 'suggestedPrompts' | 'responseComponents' | 'variant'>): ({ children, messages, avatars, handleSendMessage, }: {
    children?: React.ReactNode;
} & Pick<AIConversationProps, "avatars" | "messages" | "handleSendMessage">) => React.JSX.Element;
