import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, I18n } from 'aws-amplify';

import awsExports from '@environments/auth-with-federated/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['email', 'facebook', 'google', 'amazon'],
  },
});

I18n.setLanguage('ja');

export default function AuthenticatorWithFacebook() {
  return (
    <Authenticator>
      {({ send }) => {
        return (
          <>
            <button onClick={() => send('SIGN_OUT')}>Sign out</button>
          </>
        );
      }}
    </Authenticator>
  );
}
