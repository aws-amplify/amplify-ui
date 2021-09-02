import { translations, withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';
import { Amplify, I18n } from 'aws-amplify';

Amplify.configure(awsExports);

I18n.putVocabularies(translations);

function App({ state, send }) {
  return (
    <>
      <h1>Hello {state.context.user.username}</h1>
      <button onClick={() => send('SIGN_OUT')}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
