import { SimpleProfilePage } from './SimpleProfilePage';

import awsExports from './aws-exports';

import React from 'react';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import { Button } from 'react-native';

Amplify.configure(awsExports);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <SignOutButton />
        <SimpleProfilePage />
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
