import React from 'react';
import { Controls, AIConversationInput, AIConversation } from './types';
import {
  ActionsBarControl,
  AvatarControl,
  Conversation,
  HeaderControl,
  MessagesControl,
  SuggestedPrompts,
} from './views';
import { AIConversationElements } from './context/elements';
import createProvider from './createProvider';

export function createAIConversation<T extends AIConversationElements>(
  input: AIConversationInput<T> = {}
): {
  AIConversation: AIConversation<T>;
} {
  const { elements } = input;

  const Provider = createProvider({ elements });

  function AIConversation(): JSX.Element {
    return (
      <Provider>
        <Conversation />
      </Provider>
    );
  }

  const Controls: Controls<T> = {
    ActionsBar: ActionsBarControl,
    Avatars: AvatarControl,
    Header: HeaderControl,
    Messages: MessagesControl,
  };

  AIConversation.Provider = Provider;
  AIConversation.Controls = Controls;
  AIConversation.Conversation = Conversation;
  AIConversation.SuggestedPrompts = SuggestedPrompts;

  return { AIConversation };
}
