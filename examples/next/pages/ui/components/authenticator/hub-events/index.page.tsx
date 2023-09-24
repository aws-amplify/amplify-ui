import { Amplify } from 'aws-amplify';
import * as Auth from '@aws-amplify/auth';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({}) {
  return <button onClick={() => Auth.signOut()}>Sign out</button>;
}

export default withAuthenticator(App);
