import { DisplayTextTemplate } from '@aws-amplify/ui';

export type ConversationDisplayText = {
  conversationHeaderText?: string;
};

export const defaultAIConversationDisplayText: Required<AIConversationDisplayText> =
  {
    conversationHeaderText: 'Raven Chat',
  };

export type AIConversationDisplayText =
  DisplayTextTemplate<ConversationDisplayText>;
