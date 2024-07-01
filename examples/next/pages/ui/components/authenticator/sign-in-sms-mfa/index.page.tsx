import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { translations } from '@aws-amplify/ui';

const amplifyOutputs = (
  await import(
    `@environments/auth/auth-with-phone-and-sms-mfa/${process.env.PATH}`
  )
).default;

Amplify.configure(amplifyOutputs);

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
