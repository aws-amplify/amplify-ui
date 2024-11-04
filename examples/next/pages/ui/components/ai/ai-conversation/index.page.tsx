import { Amplify } from 'aws-amplify';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Card } from '@aws-amplify/ui-react';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

const formatDate = (date: Date): string =>
  `Argh the time be round ${date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`;

function Chat() {
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('pirateChat');

  return (
    <Card variation="outlined" width="50%" height="300px" margin="0 auto">
      <AIConversation
        displayText={{ getMessageTimestampText: formatDate }}
        messages={messages}
        handleSendMessage={sendMessage}
        isLoading={isLoading}
        allowAttachments
        suggestedPrompts={[
          {
            inputText: 'hello',
            component: 'hello',
          },
          {
            inputText: 'how are you?',
            component: 'how are you?',
          },
        ]}
        variant="bubble"
      />
    </Card>
  );
}

export default function Example() {
  return (
    <Authenticator>
      {({ user, signOut }) => {
        return <Chat />;
      }}
    </Authenticator>
  );
}
