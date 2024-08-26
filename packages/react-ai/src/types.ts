import { V6Client } from '@aws-amplify/api-graphql';
import {
  Conversation as SDKConversation,
  ConversationMessage as SDKConversationMessage,
  ConversationRoute as SDKConversationRoute,
} from '@aws-amplify/data-schema/dist/esm/ai/ConversationType';

export type Conversation = SDKConversation;

export type ConversationRoute = SDKConversationRoute;

export type ConversationMessage = SDKConversationMessage;

export type ConversationMessageContent = ConversationMessage['content'][number];

export type TextContent = NonNullable<ConversationMessageContent['text']>;

export type ImageContent = NonNullable<ConversationMessageContent['image']>;

export type InputContent = Parameters<
  Conversation['sendMessage']
>[0]['content'][number];

export type SendMessageContent = Parameters<
  Conversation['sendMessage']
>[0]['content'];

export type SendMessageContext = Parameters<
  Conversation['sendMessage']
>[0]['aiContext'];

export type ToolConfiguration = NonNullable<
  Parameters<Conversation['sendMessage']>[0]['toolConfiguration']
>;

export interface SendMesageParameters {
  content: SendMessageContent;
  aiContext?: SendMessageContext;
  toolConfiguration?: ToolConfiguration;
}

export type SendMessage = (input: SendMesageParameters) => void;

type AIClient<T extends Record<any, any>> = Pick<
  V6Client<T>,
  'generations' | 'conversations'
>;
export type getSchema<T> = T extends AIClient<infer Schema> ? Schema : never;
