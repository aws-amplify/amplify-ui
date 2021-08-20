import { Authenticator } from '@aws-amplify/ui-react';
import { dict } from '@aws-amplify/ui-core';
import { Amplify, I18n } from 'aws-amplify';

import awsExports from '@environments/auth-with-phone-and-sms-mfa/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['phone_number'],
  },
});

I18n.putVocabularies(dict);

export default function AuthenticatorWithSmsMfa() {
  return (
    <Authenticator>
      {({ send }) => {
        return (
          <>
            <button onClick={() => send('SIGN_OUT')}>Sign out</button>
          </>
        );
      }}
    </Authenticator>
  );
}
