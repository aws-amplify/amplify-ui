import React from 'react';

import { AIConversationElements } from './context/elements';
import {
  ActionsBarControl,
  AvatarControl,
  HeaderControl,
  MessagesControl,
} from './views';

export interface Controls<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): React.JSX.Element;
  Avatars: AvatarControl<T>;
  ActionsBar: ActionsBarControl<T>;
  Header: HeaderControl<T>;
  Messages: MessagesControl<T>;
}

export interface AIConversationInput<
  T extends Partial<AIConversationElements>,
> {
  elements?: T;
}

export interface AIConversation<T extends Partial<AIConversationElements>> {
  (): JSX.Element;
  Conversation: () => React.JSX.Element;
  Controls: Controls<T>;
  SuggestedPrompts: () => React.JSX.Element;
}

export type MessageVariant =
  | 'bubble-1'
  | 'bubble-2'
  | 'borderless-background'
  | 'borderless';

export interface Avatar {
  username?: string;
  avatar?: React.ReactNode;
}

export interface Avatars {
  user: Avatar;
  ai: Avatar;
}

export interface ImageContent {
  format: 'png' | 'jpeg' | 'gif' | 'webp';
  bytes: ArrayBuffer;
}

interface ImageContentBlock {
  type: 'image';
  value: ImageContent;
}

export interface TextContent {
  type: 'text';
  value: string;
}

export type Content = ImageContentBlock | TextContent;

export interface ConversationMessage {
  id: string;
  content: Content;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface CustomAction {
  displayName: string;
  handler: (message: ConversationMessage) => void;
  icon: React.ReactNode;
}
