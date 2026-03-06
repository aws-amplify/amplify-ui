import { createContextUtilities } from '@aws-amplify/ui-react-core';
import type { MessageRenderer } from '../types';

export const {
  MessageRendererContext,
  MessageRendererProvider,
  useMessageRenderer,
} = createContextUtilities<MessageRenderer>({
  contextName: 'MessageRenderer',
  defaultValue: undefined,
  errorMessage:
    '`useMessageRenderer` must be used with an AIConversation component',
});
