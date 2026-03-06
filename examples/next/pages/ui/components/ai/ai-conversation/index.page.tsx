import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Button, Card, Flex } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

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
  ] = useAIConversation('pirateChat', { onMessage, onInitialize });

  return (
    <AIConversation
      messages={messages}
      isLoading={isLoading}
      handleSendMessage={sendMessage}
    />
  );
}

const onInitialize = (conversation) => {
  console.log(conversation);
};

const onMessage = (conversation) => {
  console.log('on message');
  console.log(conversation);
};

export default function Example() {
  const router = useRouter();
  const handleCreateChat = async () => {
    const { data } = await client.conversations.pirateChat.create();
    if (data.id) {
      router.push(`/ui/components/ai/ai-conversation/${data.id}`);
    }
  };
  return (
    <Authenticator>
      <Flex direction="column">
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </Button>
        <Card flex="1" variation="outlined" height="400px" margin="large">
          <Chat />
        </Card>
      </Flex>
      <Button onClick={handleCreateChat}>Create chat</Button>
    </Authenticator>
  );
}
