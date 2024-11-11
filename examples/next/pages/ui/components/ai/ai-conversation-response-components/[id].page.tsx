import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import ReactMarkdown from 'react-markdown';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-ai/ai-conversation-styles.css';
import { GlobalStyle } from '@aws-amplify/ui-react/server';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Button, Card } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

const AIContext = React.createContext<any>(undefined);

const responseComponents = {
  WeatherCard: {
    description: 'Used to display the weather in a city',
    component: ({ city }) => {
      const aiContext = React.useContext(AIContext);
      aiContext.setAIContext({
        temperature: 72,
        city,
        weather: 'sunny',
      });
      return (
        <Card variation="outlined">
          <h3>Weather Card {city}</h3>
        </Card>
      );
    },
    props: {
      city: {
        type: 'string',
        description: 'The city to get the weather for',
      },
    },
  },
} as const;

function Chat({ id }: { id?: string }) {
  const aiContext = React.useContext(AIContext);
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('pirateChat', {
    id,
  });

  console.log(aiContext);

  return (
    <AIConversation
      messages={messages}
      isLoading={isLoading}
      handleSendMessage={(message) => {
        sendMessage({
          ...message,
          aiContext: aiContext.aiContext,
        });
      }}
      messageRenderer={{
        text: (message) => <ReactMarkdown>{message}</ReactMarkdown>,
      }}
      responseComponents={responseComponents}
    />
  );
}

export default function Example() {
  const router = useRouter();
  const [shown, setShown] = React.useState(true);
  const [aiContext, setAIContext] = React.useState<any>(undefined);

  return (
    <Authenticator>
      <Button
        onClick={() => {
          setShown(!shown);
        }}
      >
        Toggle
      </Button>
      <AIContext.Provider value={{ aiContext, setAIContext }}>
        {shown ? (
          <Card variation="outlined" height="400px" margin="large">
            <Chat id={`${router.query.id}`} />
          </Card>
        ) : null}
      </AIContext.Provider>
      <GlobalStyle
        styles={{
          code: {
            backgroundColor: 'var(--amplify-colors-background-tertiary)',
          },
          pre: {
            backgroundColor: 'var(--amplify-colors-background-tertiary)',
            display: 'block',
            padding: '1rem',
          },
        }}
      />
    </Authenticator>
  );
}
