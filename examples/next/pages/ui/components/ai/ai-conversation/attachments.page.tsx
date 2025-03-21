import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Button, Card } from '@aws-amplify/ui-react';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

function Chat() {
  const [
    {
      data: { messages },
      isLoading,
      hasError,
      messages: errorMessages,
    },
    sendMessage,
  ] = useAIConversation('pirateChat');

  if (hasError) {
    return (
      <div>
        <h2>Error</h2>
        <ul>
          {errorMessages.map((message, i) => (
            <li key={i}>{message.message}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <AIConversation
      messages={messages}
      isLoading={isLoading}
      handleSendMessage={sendMessage}
      allowAttachments
      // maxAttachmentSize={100_000}
      maxAttachments={2}
    />
  );
}

export default function Example() {
  return (
    <Authenticator>
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
    </Authenticator>
  );
}
