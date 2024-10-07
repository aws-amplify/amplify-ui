import { V6Client } from '@aws-amplify/api-graphql';

export type ConversationRoute = V6Client<any>['conversations'][string];
export type Conversation = NonNullable<
  Awaited<ReturnType<ConversationRoute['create']>>['data']
>;
export type ConversationMessage = NonNullable<
  Awaited<ReturnType<Conversation['sendMessage']>>['data']
>;

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
