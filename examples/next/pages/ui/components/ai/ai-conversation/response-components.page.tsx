import { Amplify } from 'aws-amplify';
import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Card, Text } from '@aws-amplify/ui-react';

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
    <>
      <Text>Response components</Text>
      <Card variation="outlined" width="50%" height="300px" margin="0 auto">
        <AIConversation
          messages={messages}
          handleSendMessage={sendMessage}
          isLoading={isLoading}
          allowAttachments
          responseComponents={{
            WeatherCard: {
              description:
                'Used to display the weather of a given city to the user',
              component: ({ city }) => {
                return <Card>{city}</Card>;
              },
              props: {
                city: {
                  type: 'string',
                  required: true,
                },
              },
            },
          }}
          variant="bubble"
        />
      </Card>
    </>
  );
}

export default function Example() {
  return (
    <Authenticator>
      <Chat />
    </Authenticator>
  );
}
