import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';
Amplify.configure(awsExports);

export default function AuthenticatorWithUsername() {
  return (
    <Authenticator initialState="signUp">
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
