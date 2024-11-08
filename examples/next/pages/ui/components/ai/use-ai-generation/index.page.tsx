import { Amplify } from 'aws-amplify';
import { createAIHooks } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';

import outputs from './amplify_outputs.js';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import {
  Button,
  Flex,
  Loader,
  TextField,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import React from 'react';

const client = generateClient<Schema>();
const { useAIGeneration } = createAIHooks(client);

Amplify.configure(outputs);

function Example() {
  const [{ data, isLoading, hasError, messages }, handler] =
    useAIGeneration('generateRecipe');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const description = formData.get('description') as string;
    handler({ description });
  };
  return (
    <Flex direction="column" gap="medium">
      <Flex direction="row" as="form" onSubmit={handleSubmit}>
        <TextField label="description" name="description" />
        <Button type="submit">generate</Button>
      </Flex>
      {isLoading ? <Loader /> : null}
      {hasError ? (
        <div>
          {messages?.map(({ message }, i) => <div key={i}>{message}</div>)}
        </div>
      ) : null}
      {data ? <div>{JSON.stringify(data)}</div> : null}
    </Flex>
  );
}

export default withAuthenticator(Example);
