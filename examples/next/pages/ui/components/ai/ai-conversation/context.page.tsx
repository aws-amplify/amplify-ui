import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Button, Card, Flex } from '@aws-amplify/ui-react';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

function Chat() {
  const { data } = React.useContext(AIContext);
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('pirateChat');

  return (
    <AIConversation
      messages={messages}
      isLoading={isLoading}
      handleSendMessage={sendMessage}
      // This will let the LLM know about the current state of this application
      // so it can better respond to questions
      aiContext={() => {
        return {
          ...data,
          currentTime: new Date().toLocaleTimeString(),
        };
      }}
    />
  );
}

function Counter() {
  const { data, setData } = React.useContext(AIContext);
  const count = data.count ?? 0;
  return (
    <Button onClick={() => setData({ ...data, count: count + 1 })}>
      {count}
    </Button>
  );
}

const AIContext = React.createContext<{
  data: any;
  setData: (value: React.SetStateAction<any>) => void;
}>({ data: {}, setData: () => {} });

const AIContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element => {
  const [data, setData] = React.useState({});
  return (
    <AIContext.Provider value={{ data, setData }}>
      {children}
    </AIContext.Provider>
  );
};

export default function Example() {
  return (
    <Authenticator>
      <AIContextProvider>
        <Flex direction="column" alignItems="flex-start">
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </Button>
          <Card
            flex="1"
            variation="outlined"
            // height="400px"
            width="100%"
            margin="large"
          >
            <Chat />
          </Card>
          <Counter />
        </Flex>
      </AIContextProvider>
    </Authenticator>
  );
}
