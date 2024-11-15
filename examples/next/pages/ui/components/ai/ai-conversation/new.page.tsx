import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Card, Flex } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

function Chat() {
  const router = useRouter();

  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('pirateChat', {
    onInitialize(conversation) {
      router.replace(`/ui/components/ai/ai-conversation/${conversation.id}`);
    },
  });

  return (
    <AIConversation
      messages={messages}
      isLoading={isLoading}
      handleSendMessage={sendMessage}
    />
  );
}

export default function Example() {
  return (
    <Authenticator>
      <Flex direction="row">
        <Card flex="1" variation="outlined" height="400px" margin="large">
          <Chat />
        </Card>
      </Flex>
    </Authenticator>
  );
}
