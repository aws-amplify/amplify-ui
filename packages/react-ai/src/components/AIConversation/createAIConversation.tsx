import React from 'react';

import { Controls, CreateAIConversationInput, AIConversation } from './types';
import { AIConversationElements } from './context/elements';
import createProvider from './createProvider';
import Conversation from './Views/ConversationView';
import SuggestedPrompts from './Views/SuggestedPrompts';
import { MessagesControl } from './Views/Controls/MessagesControl';

export default function createAIConversation<
  T extends Partial<AIConversationElements>,
>({ elements }: CreateAIConversationInput<T> = {}): {
  AIConversation: AIConversation<T>;
} {
  const Provider = createProvider({ elements });

  function AIConversation(): JSX.Element {
    return (
      <Provider>
        <Conversation />
      </Provider>
    );
  }

  const Controls: Controls<T> = { Messages: MessagesControl };

  AIConversation.Provider = Provider;
  AIConversation.Controls = Controls;
  AIConversation.Conversation = Conversation;
  AIConversation.SuggestedPrompts = SuggestedPrompts;

  return { AIConversation };
}
