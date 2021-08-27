import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from '@environments/auth-with-multi-alias/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['username', 'email', 'phone_number'],
  },
});

export default function AuthenticatorWithMultiAlias() {
  return (
    <Authenticator>
      {({ send }) => <button onClick={() => send('SIGN_OUT')}>Sign out</button>}
    </Authenticator>
  );
}
