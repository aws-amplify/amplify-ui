import { Authenticator } from '@aws-amplify/ui-react';
import { dict } from '@aws-amplify/ui';
import { Amplify, I18n } from 'aws-amplify';

import awsExports from '@environments/auth-with-totp-mfa/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['email'],
  },
});

I18n.putVocabularies(dict);

export default function SignInTotpMfa() {
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
