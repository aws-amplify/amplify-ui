import { Amplify } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';
import { translations } from '@aws-amplify/ui';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

// @todo-migration remove cast
I18n.putVocabularies(translations);
I18n.setLanguage('ja');
I18n.putVocabulariesForLanguage('ja', {
  'Sign In': 'Sign In Custom',
  'User does not exist.': 'Error with your user',
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
