import React from 'react';

import { AIConversationElements } from './context/elements';
import {
  ActionsBarControl,
  AvatarControl,
  FieldControl,
  HeaderControl,
  MessagesControl,
  PromptControl,
} from './views';
import { DisplayTextTemplate } from '@aws-amplify/ui';
import { AIConversationDisplayText } from './displayText';
import { ConversationMessage, SendMessage } from '../../types';
import { ControlsContextProps } from './context/ControlsContext';

export interface Controls {
  Avatars: AvatarControl;
  ActionsBar: ActionsBarControl;
  Field: FieldControl;
  Header: HeaderControl;
  Messages: MessagesControl;
  SuggestedPrompts: PromptControl;
}

export interface AIConversationInput {
  elements?: Partial<AIConversationElements>;
  displayText?: DisplayTextTemplate<AIConversationDisplayText>;
  suggestedPrompts?: SuggestedPrompt[];
  actions?: CustomAction[];
  responseComponents?: ResponseComponents;
  variant?: MessageVariant;
  controls?: ControlsContextProps;
}

export interface AIConversationProps {
  messages: ConversationMessage[];
  handleSendMessage: SendMessage;
  avatars?: Avatars;
  isLoading?: boolean;
}

export interface AIConversation {
  (props: AIConversationProps): JSX.Element;
  Conversation: () => React.JSX.Element;
  Controls: Controls;
  Provider: (
    props: {
      children?: React.ReactNode;
    } & Pick<AIConversationProps, 'messages' | 'avatars' | 'handleSendMessage'>
  ) => React.JSX.Element;
}

export type MessageVariant = 'bubble' | 'default';

export interface Avatar {
  username?: string;
  avatar?: React.ReactNode;
}

export interface Avatars {
  user?: Avatar;
  ai?: Avatar;
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

type JSONType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null'
  | 'any';

interface ResponseComponentProp {
  type: JSONType;
  enum?: string[];
  description?: string;
  required?: boolean;
}

interface ResponseComponentPropMap {
  [key: string]: ResponseComponentProp;
}

export interface ResponseComponent {
  component: React.ComponentType<any>;
  description?: string;
  props: ResponseComponentPropMap;
}

export interface ResponseComponents {
  [key: string]: ResponseComponent;
}
