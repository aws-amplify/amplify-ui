import { Amplify } from 'aws-amplify';

import { withAuthenticator, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import ampifyOutputs from './amplify_outputs';
Amplify.configure(ampifyOutputs);

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
