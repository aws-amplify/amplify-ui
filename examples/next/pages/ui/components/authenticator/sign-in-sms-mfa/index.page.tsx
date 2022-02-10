import { Amplify, I18n } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { translations } from '@aws-amplify/ui';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

I18n.putVocabularies(translations);
I18n.setLanguage('en');

I18n.putVocabulariesForLanguage('en', {
  'Invalid code or auth state for the user.': 'translated text',
});

export default function AuthenticatorWithSmsMfa() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          Hello {user.attributes.email}
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </Authenticator>
  );
}
