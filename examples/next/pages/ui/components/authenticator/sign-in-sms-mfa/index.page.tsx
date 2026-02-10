import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';

import { Authenticator } from '@aws-amplify/ui-react';

import { translations } from '@aws-amplify/ui';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

I18n.putVocabularies(translations);
I18n.setLanguage('en');

I18n.putVocabulariesForLanguage('en', {
  'CodeMismatchException: Invalid code or auth state for the user.':
    'invalid code',
});

export default function AuthenticatorWithSmsMfa() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          Hello {user.username}
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </Authenticator>
  );
}
