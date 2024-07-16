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

export function createAIConversation<T extends Partial<AIConversationElements>>(
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
    // @ts-expect-error TODO fix type error
    ActionsBar: ActionsBarControl,
    // @ts-expect-error TODO fix type error
    Avatars: AvatarControl,
    // @ts-expect-error TODO fix type error fix
    Header: HeaderControl,
    // @ts-expect-error TODO fix type error
    Messages: MessagesControl,
  };

  AIConversation.Provider = Provider;
  AIConversation.Conversation = Conversation;
  AIConversation.SuggestedPrompts = SuggestedPrompts;
  AIConversation.Controls = Controls;

  return { AIConversation };
}
