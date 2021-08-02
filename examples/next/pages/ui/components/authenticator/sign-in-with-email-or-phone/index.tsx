import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from '@environments/auth-with-email-and-phone/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['email', 'phone_number'],
  },
});

export default function AuthenticatorWithEmailOrPhone() {
  return (
    <>
      <Authenticator>
        {({ send }) => {
          return (
            <>
              <button onClick={() => send('SIGN_OUT')}>Sign out</button>
            </>
          );
        }}
      </Authenticator>
    </>
  );
}
