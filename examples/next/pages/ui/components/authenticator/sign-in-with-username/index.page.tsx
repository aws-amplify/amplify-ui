import {
  Authenticator,
  AmplifyAuthenticator,
  AmplifySignOut,
} from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['username'],
  },
});

export default function AuthenticatorWithUsername() {
  return (
    <>
      <Authenticator>
        {({ send }) => (
          <button onClick={() => send('SIGN_OUT')}>Sign out</button>
        )}
      </Authenticator>
      <AmplifyAuthenticator>
        <div>
          My App
          <AmplifySignOut />
        </div>
      </AmplifyAuthenticator>
    </>
  );
}
