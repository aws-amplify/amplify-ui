import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-multi-alias/src/aws-exports';

Amplify.configure(awsExports);

export default function AuthenticatorWithMultiAlias() {
  return (
    <Authenticator loginMechanisms={['username', 'email', 'phone_number']}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
