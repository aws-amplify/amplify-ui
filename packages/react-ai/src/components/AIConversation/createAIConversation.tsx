import React from 'react';
import type {
  AIConversationInput,
  AIConversation,
  AIConversationProps,
} from './types';
import { FormControl, MessagesControl } from './views';
import { ViewElement as View } from './context/elements/definitions';
import { AIConversationProvider } from './AIConversationProvider';
import { DefaultMessageControl } from './views/Controls/DefaultMessageControl';

export function createAIConversation(input: AIConversationInput = {}): {
  AIConversation: AIConversation;
} {
  const {
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

  function AIConversation(props: AIConversationProps): React.JSX.Element {
    const { messages, avatars, handleSendMessage, isLoading } = props;
    const providerProps = {
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
