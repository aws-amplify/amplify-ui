import React from 'react';

import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react-native';

import { SignOutButton } from '../SignOutButton';
import { VERSION } from '@env';

const AMPLIFY_CONFIG_PATH =
  VERSION === 'gen1' ? 'src/amplifyconfiguration' : 'amplify_outputs';

const amplifyOutputs = require(
  `@aws-amplify/ui-environments/auth/auth-with-email/${AMPLIFY_CONFIG_PATH}`
);

Amplify.configure(amplifyOutputs);

function App() {
  return <SignOutButton />;
}

export default withAuthenticator(App);
