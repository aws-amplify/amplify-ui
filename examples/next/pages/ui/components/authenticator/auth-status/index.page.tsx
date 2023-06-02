import { Amplify, Auth } from 'aws-amplify';

import {
  Button,
  Flex,
  Text,
  TextField,
  PasswordField,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import React from 'react';
Amplify.configure(awsExports);

export default function App() {
  const { authStatus } = useAuthenticator();

  const isAuthenticated = authStatus === 'authenticated';

  return (
    <Flex
      as="form"
      direction="column"
      onSubmit={(e: any) => {
        e.preventDefault();

        Auth.signIn(Object.fromEntries(new FormData(e.target)) as any);
      }}
    >
      <Text>{authStatus}</Text>
      {isAuthenticated ? null : (
        <>
          <TextField label="Username" id="username" name="username" />
          <PasswordField label="Password" id="password" name="password" />
        </>
      )}
      <Button
        onClick={() => {
          if (isAuthenticated) {
            Auth.signOut();
          }
        }}
        type={isAuthenticated ? 'button' : 'submit'}
      >
        {isAuthenticated ? 'Sign Out' : 'Sign In'}
      </Button>
    </Flex>
  );
}
