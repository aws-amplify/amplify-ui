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

import awsExports from './aws-exports';
import React, { useEffect } from 'react';
import { CookieStorage } from 'aws-amplify/utils';
Amplify.configure(awsExports);

function App() {
  const { authStatus } = useAuthenticator();
  useEffect(() => {
    async function my() {
      let storage = new CookieStorage();
      let item = await storage.getItem('');
    }
  }, []);

  const isAuthenticated = authStatus === 'authenticated';

  return (
    <Flex
      as="form"
      direction="column"
      onSubmit={(e: any) => {
        e.preventDefault();

        signIn(Object.fromEntries(new FormData(e.target)) as any);
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
