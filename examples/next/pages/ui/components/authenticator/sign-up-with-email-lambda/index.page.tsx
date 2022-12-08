import { Amplify } from 'aws-amplify';

import { withAuthenticator, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <>
      <Text>{user.attributes?.email}</Text>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App, {
  loginMechanisms: ['email'],
  initialState: 'signUp',
});
