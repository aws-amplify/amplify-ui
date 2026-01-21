import { Amplify } from 'aws-amplify';

import { Text, withAuthenticator } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

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
