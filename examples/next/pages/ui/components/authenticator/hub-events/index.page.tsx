import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import { withAuthenticator } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App() {
  return <button onClick={() => signOut()}>Sign out</button>;
}

export default withAuthenticator(App);
