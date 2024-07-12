import React from 'react';
import { Conversation, Messages, SuggestedPrompts, Avatar } from './views';
import { AIConversationElements } from './context/elements';
import createProvider from './createProvider';

interface AIConversationInput<T extends AIConversationElements> {
  elements?: T;
}

interface AIConversation {
  (): JSX.Element;
  Conversation: typeof Conversation;
  Messages: typeof Messages;
  SuggestedPrompts: typeof SuggestedPrompts;
  Avatar: typeof Avatar;
}

export function createAIConversation<T extends AIConversationElements>(
  input: AIConversationInput<T> = {}
): {
  AIConversation: AIConversation;
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

  AIConversation.Provider = Provider;
  AIConversation.Conversation = Conversation;
  AIConversation.Messages = Messages;
  AIConversation.SuggestedPrompts = SuggestedPrompts;
  AIConversation.Avatar = Avatar;

  return { AIConversation };
}
