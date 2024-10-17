import { V6Client } from '@aws-amplify/api-graphql';

export type ConversationRoute = V6Client<any>['conversations'][string];
export type Conversation = NonNullable<
  Awaited<ReturnType<ConversationRoute['create']>>['data']
>;

export type ConversationMessage = NonNullable<
  Awaited<ReturnType<Conversation['sendMessage']>>['data']
>;

export type ConversationMessageContent = ConversationMessage['content'][number];

export type TextContentBlock = NonNullable<ConversationMessageContent['text']>;

export type ImageContentBlock = NonNullable<
  ConversationMessageContent['image']
>;

// Note: the conversation sendMessage function is an overload
// that accepts a string OR an object
export type InputContent = Exclude<
  Parameters<Conversation['sendMessage']>[0],
  string
>['content'][number];

export type SendMessageContent = Exclude<
  Parameters<Conversation['sendMessage']>[0],
  string
>['content'];

export type SendMessageContext = Exclude<
  Parameters<Conversation['sendMessage']>[0],
  string
>['aiContext'];

export type ToolConfiguration = NonNullable<
  Exclude<
    Parameters<Conversation['sendMessage']>[0],
    string
  >['toolConfiguration']
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
