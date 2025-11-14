import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';

Amplify.configure(awsExports);
export default function AuthenticatorWithFederation() {
  return (
    <Authenticator>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
