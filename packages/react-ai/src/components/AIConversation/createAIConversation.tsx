import React from 'react';
import {
  AIConversationInput,
  AIConversation,
  AIConversationProps,
} from './types';
import { FormControl, MessagesControl } from './views';
import { ViewElement as View } from './context/elements/definitions';
import { AIConversationProvider } from './AIConversationProvider';
import { DefaultMessageControl } from './views/Controls/DefaultMessageControl';

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
    FallbackResponseComponent,
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
      FallbackResponseComponent,
    };
    return (
      <AIConversationProvider {...providerProps}>
        <View>
          <View>
            <DefaultMessageControl />
            <MessagesControl />
          </View>
          <View>
            <FormControl />
          </View>
        </View>
      </AIConversationProvider>
    );
  }

  AIConversation.Provider = AIConversationProvider;
  AIConversation.DefaultMessage = DefaultMessageControl;
  AIConversation.Messages = MessagesControl;
  AIConversation.Form = FormControl;

  return { AIConversation };
}
