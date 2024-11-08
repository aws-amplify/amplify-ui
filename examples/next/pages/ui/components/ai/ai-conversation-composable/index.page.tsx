import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Card, Flex } from '@aws-amplify/ui-react';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

function Chat() {
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('pirateChat');

  return (
    <AIConversation.Provider
      messages={messages}
      handleSendMessage={sendMessage}
      isLoading={isLoading}
      avatars={{
        user: {
          username: 'XXXX',
        },
      }}
    >
      <Flex direction="row">
        <Card variation="outlined" width="50%" flex="1">
          <AIConversation.DefaultMessage />
          <AIConversation.Messages />
        </Card>
        <Card variation="outlined" width="50%" flex="1">
          <AIConversation.Form />
        </Card>
      </Flex>
    </AIConversation.Provider>
  );
}

export default function Example() {
  return (
    <Authenticator>
      <Chat />
    </Authenticator>
  );
}
