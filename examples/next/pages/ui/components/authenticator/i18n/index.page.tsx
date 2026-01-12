import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui';

import { withAuthenticator } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

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
