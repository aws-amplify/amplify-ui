import React from 'react';

import {
  ActionsBarControl,
  AvatarControl,
  FormControl,
  MessagesControl,
  PromptControl,
} from './views';
import { DisplayTextTemplate } from '@aws-amplify/ui';
import { AIConversationDisplayText } from './displayText';
import {
  ConversationMessage,
  SendMessage,
  ResponseComponents,
  TextContentBlock,
  ImageContentBlock,
} from '../../types';
import { ControlsContextProps } from './context/ControlsContext';
import { AIConversationProviderProps } from './AIConversationProvider';

export interface Controls {
  Avatars: AvatarControl;
  ActionsBar: ActionsBarControl;
  Form: FormControl;
  Messages: MessagesControl;
  SuggestedPrompts: PromptControl;
}

export interface AIConversationInput {
  displayText?: DisplayTextTemplate<AIConversationDisplayText>;
  welcomeMessage?: React.ReactNode;
  suggestedPrompts?: SuggestedPrompt[];
  actions?: CustomAction[];
  responseComponents?: ResponseComponents;
  FallbackResponseComponent?: React.ComponentType<any>;
  variant?: MessageVariant;
  controls?: ControlsContextProps;
  allowAttachments?: boolean;
  messageRenderer?: MessageRenderer;
}

export interface AIConversationProps {
  messages: ConversationMessage[];
  handleSendMessage: SendMessage;
  avatars?: Avatars;
  isLoading?: boolean;
  aiContext?: () => object;
}

export interface AIConversation<
  PropsType extends AIConversationProps = AIConversationProps,
> {
  (props: PropsType): JSX.Element;
  DefaultMessage: () => JSX.Element | undefined;
  Messages: () => JSX.Element;
  Form: () => JSX.Element;
  Provider: (props: AIConversationProviderProps) => React.JSX.Element;
}

export type MessageVariant = 'bubble' | 'default';

export interface MessageRenderer {
  text?: (input: { text: TextContentBlock }) => React.JSX.Element;
  image?: (input: { image: ImageContentBlock }) => React.JSX.Element;
}

export interface Avatar {
  username?: string;
  avatar?: React.ReactNode;
}

export interface Avatars {
  user?: Avatar;
  ai?: Avatar;
}

export interface CustomAction {
  handler: (message: ConversationMessage) => void;
  component?: React.ReactNode;
}

export interface SuggestedPrompt {
  component?: React.ReactNode;
  inputText: string;
}
