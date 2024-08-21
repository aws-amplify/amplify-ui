import React from 'react';
import { AIConversationElements } from './context/elements';
import { ActionsBarControl, AvatarControl, FieldControl, HeaderControl, MessagesControl, PromptControl } from './views';
import { DisplayTextTemplate } from '@aws-amplify/ui';
import { AIConversationDisplayText } from './displayText';
import { ConversationMessage, SendMessage } from '../../types';
export interface Controls<T extends Partial<AIConversationElements> = AIConversationElements> {
    (): React.JSX.Element;
    Avatars: AvatarControl<T>;
    ActionsBar: ActionsBarControl<T>;
    Field: FieldControl<T>;
    Header: HeaderControl<T>;
    Messages: MessagesControl<T>;
    SuggestedPrompts: PromptControl<T>;
}
export interface AIConversationInput<T extends Partial<AIConversationElements>> {
    elements?: T;
    displayText?: DisplayTextTemplate<AIConversationDisplayText>;
    suggestedPrompts?: SuggestedPrompt[];
    actions?: CustomAction[];
    showChainOfThought?: boolean;
    responseComponents?: ResponseComponents;
    variant?: MessageVariant;
}
export interface AIConversationProps {
    messages: ConversationMessage[];
    handleSendMessage: SendMessage;
    avatars: Avatars;
}
export interface AIConversation<T extends Partial<AIConversationElements>> {
    (props: AIConversationProps): JSX.Element;
    Conversation: () => React.JSX.Element;
    Controls: Controls<T>;
}
export type MessageVariant = 'bubble-1' | 'bubble-2' | 'borderless-background' | 'borderless';
export interface Avatar {
    username?: string;
    avatar?: React.ReactNode;
}
export interface Avatars {
    user: Avatar;
    ai: Avatar;
}
export interface CustomAction {
    displayName: string;
    handler: (message: ConversationMessage) => void;
    icon: React.ReactNode;
}
export interface SuggestedPrompt {
    icon?: React.ReactNode;
    header: string;
    inputText: string;
}
type ResponseComponentProp = {
    type: string;
    enum?: string[];
    description?: string;
};
type ResponseComponentPropMap = {
    [key: string]: ResponseComponentProp;
};
export type ResponseComponent = {
    component: React.ComponentType;
    description?: string;
    props: ResponseComponentPropMap;
};
export interface ResponseComponents {
    [key: string]: ResponseComponent;
}
export {};
