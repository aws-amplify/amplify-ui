import {
  Conversation as SDKConversation,
  ConversationMessage as SDKConversationMessage,
} from '@aws-amplify/data-schema/dist/esm/ai/ConversationType';

export type Conversation = SDKConversation;

export type ConversationMessage = SDKConversationMessage;

export type ConversationMessageContent = ConversationMessage['content'][number];

export type TextContent = NonNullable<ConversationMessageContent['text']>;

export type ImageContent = NonNullable<ConversationMessageContent['image']>;

export type InputContent = Parameters<
  Conversation['sendMessage']
>[0]['content'][number];

export interface SendMesageParameters {
  content: Parameters<Conversation['sendMessage']>[0]['content'];
  aiContext?: Parameters<Conversation['sendMessage']>[0]['aiContext'];
  responseComponents?: any;
}

export type SendMessage = (input: SendMesageParameters) => void;
