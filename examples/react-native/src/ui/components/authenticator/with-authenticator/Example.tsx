import React from 'react';

import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react-native';

import { SignOutButton } from '../SignOutButton';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  return <SignOutButton />;
}

export default withAuthenticator(App);
