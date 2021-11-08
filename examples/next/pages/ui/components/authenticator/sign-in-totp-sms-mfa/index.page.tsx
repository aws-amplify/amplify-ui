import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '@environments/auth-with-totp-and-sms-mfa/src/aws-exports';
Amplify.configure(awsExports);

export default function SignInTotpSmsMfa() {
  return (
    <Authenticator>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
