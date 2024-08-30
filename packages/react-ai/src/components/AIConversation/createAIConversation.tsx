import React from 'react';
import {
  Controls,
  AIConversationInput,
  AIConversation,
  AIConversationProps,
} from './types';
import {
  ActionsBarControl,
  AvatarControl,
  Conversation,
  FieldControl,
  HeaderControl,
  MessagesControl,
  PromptControl,
} from './views';
import { AIConversationElements } from './context/elements';
import createProvider from './createProvider';

export function createAIConversation<T extends Partial<AIConversationElements>>(
  input: AIConversationInput<T> = {}
): {
  AIConversation: AIConversation<T>;
} {
  const {
    elements,
    suggestedPrompts,
    actions,
    responseComponents,
    variant,
    controls,
  } = input;

  const Provider = createProvider({
    elements,
    actions,
    suggestedPrompts,
    responseComponents,
    variant,
    controls,
  });

  function AIConversation(props: AIConversationProps): JSX.Element {
    const { messages, avatars, handleSendMessage, isLoading } = props;
    return (
      <Provider
        messages={messages}
        avatars={avatars}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
      >
        <Conversation />
      </Provider>
    );
  }

  const Controls: Controls<T> = {
    // @ts-expect-error TODO fix type error
    ActionsBar: ActionsBarControl,
    // @ts-expect-error TODO fix type error
    Avatars: AvatarControl,
    // @ts-expect-error TODO fix type error
    Field: FieldControl,
    // @ts-expect-error TODO fix type error
    Header: HeaderControl,
    // @ts-expect-error TODO fix type error
    Messages: MessagesControl,
    // @ts-expect-error TODO fix type error
    SuggestedPrompts: PromptControl,
  };

  AIConversation.Provider = Provider;
  AIConversation.Conversation = Conversation;
  AIConversation.Controls = Controls;

  return { AIConversation };
}
