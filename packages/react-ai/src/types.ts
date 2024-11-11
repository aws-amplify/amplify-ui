import { V6Client } from '@aws-amplify/api-graphql';

export type ConversationRoute = V6Client<any>['conversations'][string];
export type Conversation = NonNullable<
  Awaited<ReturnType<ConversationRoute['create']>>['data']
>;

export type ConversationStreamEvent = Parameters<
  Parameters<Conversation['onStreamEvent']>[0]['next']
>[0];

export type ConversationMessage = NonNullable<
  Awaited<ReturnType<Conversation['sendMessage']>>['data']
> & {
  // adding isLoading on a per-message basis
  // because with streaming a message can be loading
  // but also the whole conversation can be loading
  // if the user is resuming a conversation
  isLoading?: boolean;
};

export type ConversationMessageContent = ConversationMessage['content'][number];

export type TextContentBlock = NonNullable<ConversationMessageContent['text']>;

export type ImageContentBlock = NonNullable<
  ConversationMessageContent['image']
>;

export type ToolUseContent = NonNullable<ConversationMessageContent['toolUse']>;

export type ToolResultContent = NonNullable<
  ConversationMessageContent['toolResult']
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

export interface GraphQLFormattedError {
  readonly message: string;
  readonly errorType: string;
  readonly errorInfo?: null | {
    [key: string]: unknown;
  };
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
