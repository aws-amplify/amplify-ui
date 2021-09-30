import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-all-attributes/src/aws-exports';

Amplify.configure(awsExports);

export default function AuthenticatorWithAttributes() {
  return (
    <Authenticator initialState="signUp">
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
