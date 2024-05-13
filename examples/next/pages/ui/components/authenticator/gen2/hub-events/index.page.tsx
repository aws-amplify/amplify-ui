import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import amplifyOutputs from './amplify_outputs';
Amplify.configure(amplifyOutputs);

function App() {
  return <button onClick={() => signOut()}>Sign out</button>;
}

export default withAuthenticator(App);
