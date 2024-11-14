import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import { createAIHooks } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';

import outputs from './amplify_outputs.js';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import {
  Button,
  Flex,
  Loader,
  TextAreaField,
  Text,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import React from 'react';

const client = generateClient<Schema>();
const { useAIGeneration } = createAIHooks(client);

Amplify.configure(outputs);

function Example() {
  const [description, setDescription] = React.useState('');
  const [{ data, isLoading, hasError }, generateRecipe] =
    useAIGeneration('generateRecipe');

  const handleClick = async () => {
    generateRecipe({ description });
  };

  return (
    <Flex direction="column">
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
      <Flex direction="row">
        <TextAreaField
          autoResize
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
        />
        <Button onClick={handleClick}>generate</Button>
      </Flex>
      {isLoading ? (
        <Loader variation="linear" />
      ) : (
        <>
          <Text fontWeight="bold">{data?.name}</Text>
          <View as="ul">
            {data?.ingredients?.map((ingredient) => (
              <View as="li" key={ingredient}>
                {ingredient}
              </View>
            ))}
          </View>
          <Text testId="recipe">{data?.instructions}</Text>
        </>
      )}
    </Flex>
  );
}

export default withAuthenticator(Example);
