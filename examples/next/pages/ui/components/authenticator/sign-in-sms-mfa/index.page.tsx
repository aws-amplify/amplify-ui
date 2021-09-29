import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-phone-and-sms-mfa/src/aws-exports';

Amplify.configure(awsExports);

export default function AuthenticatorWithSmsMfa() {
  return (
    <Authenticator loginMechanisms={['phone_number']}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
