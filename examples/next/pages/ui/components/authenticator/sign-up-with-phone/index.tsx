import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from '@environments/auth-with-phone-number/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['phone_number'],
  },
});

export default function AuthenticatorWithPhone() {
  return (
    <>
      <Authenticator>
        {({ send }) => {
          return (
            <>
              <h1>Hello</h1>
              <button onClick={() => send('SIGN_OUT')}>Sign out</button>
            </>
          );
        }}
      </Authenticator>
    </>
  );
}
