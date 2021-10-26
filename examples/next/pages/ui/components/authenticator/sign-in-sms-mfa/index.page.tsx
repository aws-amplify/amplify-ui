import { Amplify } from '@aws-amplify/core';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '@environments/auth-with-phone-and-sms-mfa/src/aws-exports';
Amplify.configure(awsExports);

export default function AuthenticatorWithSmsMfa() {
  return (
    <Authenticator loginMechanisms={['phone_number']}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
