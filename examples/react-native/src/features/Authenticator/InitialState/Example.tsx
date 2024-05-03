import React from 'react'; // IGNORE
import { Button } from 'react-native';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify'; // IGNORE
import awsconfig from './aws-exports'; // IGNORE
Amplify.configure(awsconfig); // IGNORE

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator initialState="signUp">
        <SignOutButton />
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
