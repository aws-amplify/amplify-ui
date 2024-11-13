import React from 'react';

import { createAIConversation } from '@aws-amplify/ui-react-ai';
import { ACTIONS, AVATARS, INITIAL_MESSAGES, PROMPTS } from '../constants';
import '@aws-amplify/ui-react/styles.css';

const { AIConversation } = createAIConversation({
  suggestedPrompts: PROMPTS,
  actions: ACTIONS,
  variant: 'bubble',
});

export default function Example() {
  const messages = INITIAL_MESSAGES;

  return (
    <AIConversation
      messages={messages}
      avatars={AVATARS}
      handleSendMessage={() => {}}
    />
  );
}
