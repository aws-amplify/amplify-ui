import React from 'react';
import { Conversation, Messages, SuggestedPrompts, Avatar } from './views';

interface AIConversation {
  (): JSX.Element;
  Conversation: typeof Conversation;
  Messages: typeof Messages;
  SuggestedPrompts: typeof SuggestedPrompts;
  Avatar: typeof Avatar;
}

export function createAIConversation(): {
  AIConversation: AIConversation;
} {
  function AIConversation(): JSX.Element {
    return (
      <div>
        <Conversation />
      </div>
    );
  }

  AIConversation.Conversation = Conversation;
  AIConversation.Messages = Messages;
  AIConversation.SuggestedPrompts = SuggestedPrompts;
  AIConversation.Avatar = Avatar;

  return { AIConversation };
}
