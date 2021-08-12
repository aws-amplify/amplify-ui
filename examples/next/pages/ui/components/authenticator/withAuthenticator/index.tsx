import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import awsExports from 'environments/auth-with-username-no-attributes/src/aws-exports';

Amplify.configure(awsExports);

function App({ state, send }) {
  return (
    <>
      <h1>Hello {state.context.user.username}</h1>
      <button onClick={() => send('SIGN_OUT')}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
