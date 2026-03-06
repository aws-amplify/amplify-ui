import type { DisplayTextTemplate } from '@aws-amplify/ui';
import { formatDate } from './utils';

export type ConversationDisplayText = {
  getMessageTimestampText?: (date: Date) => string;
  getMaxAttachmentErrorText?: (count: number) => string;
  getAttachmentSizeErrorText?: (sizeText: string) => string;
  getAttachmentFormatErrorText?: (formats: string[]) => string;
};

export const defaultAIConversationDisplayTextEn: Required<AIConversationDisplayText> =
  {
    getMessageTimestampText: (date) => formatDate(date),
    getMaxAttachmentErrorText(count) {
      return `Cannot choose more than ${count} ${
        count === 1 ? 'file' : 'files'
      }. `;
    },
    getAttachmentSizeErrorText(sizeText) {
      return `File size must be below ${sizeText}.`;
    },
    getAttachmentFormatErrorText(formats) {
      return `Files must be one of the supported types: ${formats.join(', ')}.`;
    },
  };

export type AIConversationDisplayText =
  DisplayTextTemplate<ConversationDisplayText>;
