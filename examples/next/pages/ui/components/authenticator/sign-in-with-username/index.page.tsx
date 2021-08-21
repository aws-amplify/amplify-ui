import { Authenticator } from '@aws-amplify/ui-react';
import { dict } from '@aws-amplify/ui-core';
import { Amplify, I18n } from 'aws-amplify';

import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['username'],
  },
});

I18n.putVocabularies(dict);

export default function AuthenticatorWithUsername() {
  return (
    <Authenticator>
      {({ send }) => <button onClick={() => send('SIGN_OUT')}>Sign out</button>}
    </Authenticator>
  );
}
