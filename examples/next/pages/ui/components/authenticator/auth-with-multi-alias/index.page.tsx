import { Amplify } from '@aws-amplify/core';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '@environments/auth-with-multi-alias/src/aws-exports';
Amplify.configure(awsExports);

export default function AuthenticatorWithMultiAlias() {
  return (
    <Authenticator loginMechanisms={['username', 'email', 'phone_number']}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
