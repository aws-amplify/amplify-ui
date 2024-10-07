import { Amplify } from 'aws-amplify';
import { createAIHooks } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-ai/ai-conversation-styles.css';

import outputs from './amplify_outputs.js';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator } from '@aws-amplify/ui-react';
import React from 'react';

const client = generateClient<Schema>();
const { useAIGeneration } = createAIHooks(client);

Amplify.configure(outputs);

export default function Example() {
  const [{ data }, handler] = useAIGeneration('generateRecipe');
  return (
    <Authenticator>
      {({ user }) => {
        return (
          <>
            <h1>Hello {user.username}</h1>
            <div>{JSON.stringify(data)}</div>
            <button
              onClick={() => {
                handler({
                  description:
                    'I want a recipe for a gluten-free chocolate cake.',
                });
              }}
            >
              generate
            </button>
          </>
        );
      }}
    </Authenticator>
  );
}
