import React from 'react';
import { Button } from 'react-native';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import { SignUpInput, signUp } from 'aws-amplify/auth';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator
        services={{
          handleSignUp: ({ username, password, options }: SignUpInput) =>
            signUp({
              username: username.toLowerCase(),
              password,
              options: {
                ...options,
                userAttributes: {
                  ...options?.userAttributes,
                  email: options?.userAttributes?.email?.toLowerCase(),
                },
              },
            }),
        }}
      >
        <SignOutButton />
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
