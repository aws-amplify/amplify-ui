import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-federated/src/aws-exports';

Amplify.configure(awsExports);

export default function AuthenticatorWithFacebook() {
  return (
    <Authenticator loginMechanisms={['email', 'facebook', 'google', 'amazon']}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
