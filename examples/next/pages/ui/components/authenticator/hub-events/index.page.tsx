import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

function App() {
  return <button onClick={() => signOut()}>Sign out</button>;
}

export default withAuthenticator(App);
