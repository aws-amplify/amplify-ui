import React from 'react';
import { Button } from 'react-native';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify, Auth } from 'aws-amplify';

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
            let { username, password, attributes } = formData;
            // custom username
            username = username.toLowerCase();
            attributes.email = attributes.email.toLowerCase();
            return Auth.signUp({
              username,
              password,
              attributes,
              autoSignIn: {
                enabled: true,
              },
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
