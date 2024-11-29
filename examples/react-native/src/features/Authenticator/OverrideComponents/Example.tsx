import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import outputs from '@aws-amplify/ui-environments/auth/gen2/auth-with-federated-sign-in-react-native/amplify_outputs.json';

import SignIn from './SignIn';

Amplify.configure(outputs);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}
// 9292929
function App() {
  return (
    <Authenticator.Provider>
      <Authenticator components={{ SignIn }}>
        {/* <Authenticator> */}
        <View style={style.container}>
          <SignOutButton />
        </View>
      </Authenticator>
    </Authenticator.Provider>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
