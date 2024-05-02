import React from 'react';
import { Button } from 'react-native';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

// import config from './aws-exports'; // Amplify Gen 1 config
// @ts-expect-error // IGNORE
import config from './amplify_outputs.json';
Amplify.configure(config);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <SignOutButton />
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
