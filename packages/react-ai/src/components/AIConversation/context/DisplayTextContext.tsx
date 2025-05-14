import { createContextUtilities } from '@aws-amplify/ui-react-core';
import type { ConversationDisplayText } from '../displayText';
import { defaultAIConversationDisplayTextEn } from '../displayText';

export const {
  ConversationDisplayTextContext,
  ConversationDisplayTextProvider,
  useConversationDisplayText,
} = createContextUtilities<Required<ConversationDisplayText>>({
  contextName: 'ConversationDisplayText',
  defaultValue: defaultAIConversationDisplayTextEn,
});
