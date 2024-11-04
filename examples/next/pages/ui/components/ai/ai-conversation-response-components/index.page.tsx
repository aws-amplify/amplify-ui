import * as React from 'react';
import { Amplify } from 'aws-amplify';
import {
  createAIHooks,
  AIConversation,
  createAIConversation,
} from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-ai/ai-conversation-styles.css';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Card, Loader } from '@aws-amplify/ui-react';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

function WeatherCard({ location }: { location: string }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setIsLoaded(true), 3000);
  }, [location]);
  return isLoaded ? <div>weather card {location}</div> : <Loader />;
}

function Chat() {
  const [
    {
      data: { messages },
      hasError,
      message,
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('chat', {
    onResponse: (response) => {
      console.log('onResponse', response);
    },
    responseComponents: {
      WeatherCard: {
        description: 'Used to display the weather',
        component: WeatherCard,
        props: {
          location: {
            type: 'string',
          },
        },
      },
    },
  });

  console.log({ hasError, message });

  return (
    <Card variation="outlined" width="50%" height="300px" margin="0 auto">
      <AIConversation
        messages={messages}
        handleSendMessage={sendMessage}
        isLoading={isLoading}
        // allowAttachments
        responseComponents={{
          WeatherCard: {
            description: 'Used to display the weather',
            component: WeatherCard,
            props: {
              location: {
                type: 'string',
              },
            },
          },
        }}
        // variant="bubble"
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
