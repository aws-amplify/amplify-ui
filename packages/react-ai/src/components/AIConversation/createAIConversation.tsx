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
  FormControl,
  MessagesControl,
  PromptControl,
} from './views';
import { ViewElement as View } from './context/elements/definitions';
import { AIConversationProvider } from './AIConversationProvider';
import { AutoHidablePromptControl } from './views/Controls/PromptControl';

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
        <View>
          <View>
            <AutoHidablePromptControl />
            <MessagesControl />
          </View>
          <View>
            <FormControl />
          </View>
        </View>
      </AIConversationProvider>
    );
  }

  const Controls: Controls = {
    ActionsBar: ActionsBarControl,
    Avatars: AvatarControl,
    Form: FormControl,
    Messages: MessagesControl,
    SuggestedPrompts: PromptControl,
  };

  AIConversation.Provider = AIConversationProvider;
  AIConversation.Controls = Controls;
  AIConversation.Form = FormControl;
  AIConversation.MessageList = MessagesControl;

  return { AIConversation };
}
