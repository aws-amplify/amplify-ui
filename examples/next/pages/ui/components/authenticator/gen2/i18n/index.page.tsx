import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import amplifyOutputs from './amplify_outputs';
Amplify.configure(amplifyOutputs);

I18n.putVocabularies(translations);
I18n.setLanguage('ja');
I18n.putVocabulariesForLanguage('ja', {
  'Sign In': 'Sign In Custom',
  'Incorrect username or password.': 'Error with your user',
});

function App({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App, { initialState: 'signUp' });
