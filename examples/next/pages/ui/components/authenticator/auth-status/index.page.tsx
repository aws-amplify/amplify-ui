import { Amplify } from 'aws-amplify';
import { signIn, signOut } from 'aws-amplify/auth';

import {
  Authenticator,
  Button,
  Flex,
  Text,
  TextField,
  PasswordField,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import React from 'react';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

function App() {
  const { authStatus } = useAuthenticator();

  const isAuthenticated = authStatus === 'authenticated';

  return (
    <Flex
      as="form"
      direction="column"
      onSubmit={(e: any) => {
        e.preventDefault();
        signIn({
          username: e.target.email.value,
          password: e.target.password.value,
        });
      }}
    >
      <Text>{authStatus}</Text>
      {isAuthenticated ? null : (
        <>
          <TextField label="Email" id="email" name="email" />
          <PasswordField label="Password" id="password" name="password" />
        </>
      )}
      <Button
        onClick={() => {
          if (isAuthenticated) {
            signOut();
          }
        }}
        type={isAuthenticated ? 'button' : 'submit'}
      >
        {isAuthenticated ? 'Sign Out' : 'Sign In'}
      </Button>
    </Flex>
  );
}

export default function ProviderWrappedApp() {
  return (
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  );
}
