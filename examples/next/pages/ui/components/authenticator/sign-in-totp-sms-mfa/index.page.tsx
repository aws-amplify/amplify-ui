import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-totp-and-sms-mfa/src/aws-exports';

Amplify.configure(awsExports);

export default function SignInTotpSmsMfa() {
  return (
    <Authenticator loginMechanisms={['email']}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
