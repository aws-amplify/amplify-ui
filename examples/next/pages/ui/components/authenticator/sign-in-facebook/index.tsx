import { Authenticator } from 'aws-amplify-react';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-facebook/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['email'],
  },
});

export default function AuthenticatorWithFacebook() {
  return <Authenticator />;
}
