import React from 'react';

import { AIConversationElements } from './context/elements';
import { Controls, CreateAIConversationInput, AIConversation } from './types';
import createProvider from './createProvider';
import Conversation from './Views/ConversationView';
import SuggestedPrompts from './Views/SuggestedPrompts';

export default function createAIConversation<
  T extends Partial<AIConversationElements>,
>({ elements }: CreateAIConversationInput<T> = {}): {
  AIConversation: AIConversation<T>;
} {
  const Provider = createProvider({ elements });

  function AIConversation(): JSX.Element {
    return (
      <Provider>
        <div>Hello world</div>
      </Provider>
    );
  }

  // @ts-expect-error FIXME -> `Controls` need to be nested in `View` components
  const Controls: Controls<T> = { Messages: MessagesControl };

  AIConversation.Controls = Controls;
  AIConversation.Conversation = Conversation;
  AIConversation.SuggestedPrompts = SuggestedPrompts;

  return { AIConversation };
}
