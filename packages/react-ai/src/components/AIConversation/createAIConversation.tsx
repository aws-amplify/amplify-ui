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
import createProvider from './createProvider';

/**
 * @experimental
 */
export function createAIConversation(input: AIConversationInput = {}): {
  AIConversation: AIConversation;
} {
  const {
    elements,
    suggestedPrompts,
    actions,
    responseComponents,
    variant,
    controls,
    displayText,
  } = input;

  const Provider = createProvider({
    elements,
    actions,
    suggestedPrompts,
    responseComponents,
    variant,
    controls,
    displayText,
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

  const Controls: Controls = {
    ActionsBar: ActionsBarControl,
    Avatars: AvatarControl,
    Field: FieldControl,
    Header: HeaderControl,
    Messages: MessagesControl,
    SuggestedPrompts: PromptControl,
  };

  AIConversation.Provider = Provider;
  AIConversation.Conversation = Conversation;
  AIConversation.Controls = Controls;

  return { AIConversation };
}
