import { withAuthenticator } from '@aws-amplify/ui-react';
import { dict } from '@aws-amplify/ui-core';
import { Amplify, I18n } from 'aws-amplify';

import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';
Amplify.configure(awsExports);

I18n.putVocabularies(dict);

function App({ state, send }) {
  return (
    <>
      <h1>Hello {state.context.user.username}</h1>
      <button onClick={() => send('SIGN_OUT')}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
