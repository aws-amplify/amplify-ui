import React from 'react';

import { AIConversationElements } from './context/elements';
import { MessagesControl } from './Views/Controls';

export interface Controls<T extends Partial<AIConversationElements>> {
  (): React.JSX.Element;
  Messages: MessagesControl<T>;
}

export interface CreateAIConversationInput<
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

export interface Message {
  id: string;
  content: Content;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Message {
  id: string;
  content: Content;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface CustomAction {
  displayName: string;
  handler: (message: Message) => void;
  icon: React.ReactNode;
}
