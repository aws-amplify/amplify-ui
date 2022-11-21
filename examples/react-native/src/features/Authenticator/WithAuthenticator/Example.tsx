import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { Amplify } from 'aws-amplify';
import {
  useAuthenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react-native';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App() {
  return (
    <View style={style.container}>
      <SignOutButton />
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default withAuthenticator(App);
