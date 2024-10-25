import { Amplify } from 'aws-amplify';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-ai/ai-conversation-styles.css';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Card } from '@aws-amplify/ui-react';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

const responseComponents = {
  WeatherCard: {
    description: 'Used to display the weather in a city',
    component: ({ city }) => {
      return (
        <Card variation="outlined">
          <h3>Weather Card {city}</h3>
        </Card>
      );
    },
    // there needs to be a way for the component itself
    // to tell the chat what it rendered
    // can we do that will a callback?
    props: {
      city: {
        type: 'string',
        description: 'The city to get the weather for',
      },
    },
  },
} as const;

function Chat() {
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('chat');

  console.log(messages);

  return (
    <Card variation="outlined" width="50%" height="300px" margin="0 auto">
      <AIConversation
        messages={messages}
        handleSendMessage={sendMessage}
        isLoading={isLoading}
        allowAttachments
        variant="bubble"
        responseComponents={responseComponents}
      />
    </Card>
  );
}

export default function Example() {
  return (
    <Authenticator>
      <Chat />
    </Authenticator>
  );
}
