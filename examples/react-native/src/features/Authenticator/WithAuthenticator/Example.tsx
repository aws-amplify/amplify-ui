import React from 'react';
import { Button } from 'react-native';

import { Amplify } from 'aws-amplify';
import {
  useAuthenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react-native';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

function App() {
  return <SignOutButton />;
}

export default withAuthenticator(App);
