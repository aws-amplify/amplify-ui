import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import awsExports from 'environments/auth-with-username-no-attributes/src/aws-exports';

Amplify.configure(awsExports);

export default function AuthenticatorWithUsername() {
  return <Authenticator />;
}
