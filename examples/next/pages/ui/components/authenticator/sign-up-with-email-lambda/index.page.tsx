import { Amplify } from 'aws-amplify';

import { withAuthenticator, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const amplifyOutputs = (
  await import(
    `@environments/auth/auth-with-email-lambda-signup-trigger/${process.env.PATH}`
  )
).default;

Amplify.configure(amplifyOutputs);

function App({ signOut, user }) {
  return (
    <>
      <Text>{user.username}</Text>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App, {
  loginMechanisms: ['email'],
  initialState: 'signUp',
});
