import { DisplayTextTemplate } from '@aws-amplify/ui';
import { formatDate } from './utils';

export type ConversationDisplayText = {
  getMessageTimestampText?: (date: Date) => string;
};

export const defaultAIConversationDisplayTextEn: Required<AIConversationDisplayText> =
  {
    getMessageTimestampText: (date: Date) => formatDate(date),
  };

export type AIConversationDisplayText =
  DisplayTextTemplate<ConversationDisplayText>;
