import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Button, Card } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

const onMessage = (message) => {
  console.log('onmessage', message);
};

function Chat({ id }: { id?: string }) {
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('pirateChat', {
    id,
    onMessage,
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
  const router = useRouter();
  const [shown, setShown] = React.useState(true);

  if (router.query.id) {
    return (
      <Authenticator>
        <Button
          onClick={() => {
            setShown(!shown);
          }}
        >
          Toggle
        </Button>
        {shown ? (
          <Card variation="outlined" height="400px" margin="large">
            <Chat id={`${router.query.id}`} />
          </Card>
        ) : null}
      </Authenticator>
    );
  }
}
