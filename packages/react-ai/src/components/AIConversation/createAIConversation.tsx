import React from 'react';
import { Conversation, Messages, SuggestedPrompts, Avatar } from './views';
import { ElementsProvider } from '@aws-amplify/ui-react/internal';
import { ButtonElement, ParagraphElement, ViewElement } from './types';

interface AIConversationElements {
  View: typeof ViewElement;
  Button: typeof ButtonElement;
  Paragraph: typeof ParagraphElement;
}

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
  input: AIConversationInput<T>
): {
  AIConversation: AIConversation;
} {
  const { elements } = input;

  const Provider = ({ children }: { children?: React.ReactNode }) => (
    <ElementsProvider elements={elements}>{children}</ElementsProvider>
  );

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
