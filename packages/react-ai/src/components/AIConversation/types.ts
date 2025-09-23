import type React from 'react';

import type {
  ActionsBarControl,
  AvatarControl,
  FormControl,
  MessagesControl,
  PromptControl,
} from './views';
import type { DisplayTextTemplate } from '@aws-amplify/ui';
import type { AIConversationDisplayText } from './displayText';
import type {
  ConversationMessage,
  SendMessage,
  ResponseComponents,
  TextContentBlock,
  ImageContentBlock,
} from '../../types';
import type { ControlsContextProps } from './context/ControlsContext';
import type { AIConversationProviderProps } from './AIConversationProvider';

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
  maxAttachments?: number;
  maxAttachmentSize?: number;
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
  (props: PropsType): React.JSX.Element;
  DefaultMessage: () => React.JSX.Element | undefined;
  Messages: () => React.JSX.Element;
  Form: () => React.JSX.Element;
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
