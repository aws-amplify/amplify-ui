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
import { AIConversationProvider } from './AIConversationProvider';

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
    allowAttachments,
    messageRenderer,
  } = input;

  function AIConversation(props: AIConversationProps): JSX.Element {
    const { messages, avatars, handleSendMessage, isLoading } = props;
    const providerProps = {
      elements,
      actions,
      suggestedPrompts,
      responseComponents,
      variant,
      controls,
      displayText,
      allowAttachments,
      messages,
      avatars,
      handleSendMessage,
      isLoading,
      messageRenderer,
    };
    return (
      <AIConversationProvider {...providerProps}>
        <Conversation />
      </AIConversationProvider>
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

  AIConversation.Provider = AIConversationProvider;
  AIConversation.Conversation = Conversation;
  AIConversation.Controls = Controls;

  return { AIConversation };
}
