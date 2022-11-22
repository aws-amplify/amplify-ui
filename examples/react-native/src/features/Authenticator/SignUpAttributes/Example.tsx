import React from 'react';
import { Button } from 'react-native';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

// replace with actual amplify config from environments
// import config from '../../../aws-exports';

Amplify.configure({});

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator signUpAttributes={[]}>
        <SignOutButton />
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
