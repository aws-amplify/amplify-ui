import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
// @todo-migration zero config workaround
import { getAuthenticatorConfig } from '@aws-amplify/ui';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function SignInTotpSmsMfa() {
  return (
    <Authenticator {...getAuthenticatorConfig(awsExports)}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
