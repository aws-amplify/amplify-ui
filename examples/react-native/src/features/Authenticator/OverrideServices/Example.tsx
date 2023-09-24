import React from 'react';
import { Button } from 'react-native';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import * as Auth from '@aws-amplify/auth';

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
          handleSignUp: (formData) => {
            let { username, password, attributes = {} } = formData;
            // custom username
            username = username.toLowerCase();
            // @todo-migration clean up
            attributes.email = attributes.email
              ? attributes?.email.toLowerCase()
              : undefined;
            return Auth.signUp({
              username,
              password,
              options: {
                userAttributes: attributes,
              },
              // @todo-migration re-enable
              // autoSignIn: {
              //   enabled: true,
              // },
            });
          },
        }}
      >
        <SignOutButton />
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
