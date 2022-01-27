import { Amplify, Auth } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({}) {
  return <button onClick={() => Auth.signOut()}>Sign out</button>;
}

export default withAuthenticator(App);
