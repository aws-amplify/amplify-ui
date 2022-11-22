import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

const MySignIn = () => {
  return (
    <View>
      <Text>My Sign In</Text>
    </View>
  );
};

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator
        // render override SignIn subcomponent
        components={{ SignIn: MySignIn }}
      >
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
