import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import React from 'react';
import { AIContextProvider, createAIHooks } from '@aws-amplify/ui-react-ai';

import outputs from './amplify_outputs.js';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';

const client = generateClient<Schema>();
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

export default function App() {
  return (
    <AIContextProvider>
      <MyConversation />
    </AIContextProvider>
  );
}

export function MyConversation() {
  const [
    {
      data: { messages },
    },
    sendMessage,
  ] = useAIConversation('pirateChat');

  return (
    <Authenticator>
      {({ user, signOut }) => {
        return (
          <main>
            <h1>Hello {user.username}</h1>
            {messages.map((message) => {
              return message.content.map((content) => (
                <p key={`${message.id + content.text}`}>{content.text}</p>
              ));
            })}
            <button
              onClick={() => {
                const content = [{ text: 'foo' }];
                const aiContext = { userFullName: 'Bruce Parker' };
                sendMessage({ content, aiContext });
              }}
            >
              Send a message
            </button>
            <button onClick={() => signOut()}>Signout</button>
          </main>
        );
      }}
    </Authenticator>
  );
}
