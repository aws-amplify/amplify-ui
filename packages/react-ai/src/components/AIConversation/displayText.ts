import { DisplayTextTemplate } from '@aws-amplify/ui';
import { formatDate } from './utils';

export type ConversationDisplayText = {
  getMessageTimestampText?: (date: Date) => string;
  getMaxAttachmentErrorText?: (count: number) => string;
  getAttachmentSizeErrorText?: (sizeText: string) => string;
};

export const defaultAIConversationDisplayTextEn: Required<AIConversationDisplayText> =
  {
    getMessageTimestampText: (date: Date) => formatDate(date),
    getMaxAttachmentErrorText(count: number): string {
      return `Cannot choose more than ${count} ${
        count === 1 ? 'file' : 'files'
      }. `;
    },
    getAttachmentSizeErrorText(sizeText: string): string {
      return `File size must be below ${sizeText}.`;
    },
  };

export type AIConversationDisplayText =
  DisplayTextTemplate<ConversationDisplayText>;
