import { Amplify } from 'aws-amplify';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function SignInTotpMfa() {
  const formFields = { setupTOTP: { QR: { totpIssuer: 'My Web App' } } };
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <Authenticator formFields={formFields}>
        {({ signOut }) => (
          <>
            <span>{user?.username}</span>
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </Authenticator>
    </>
  );
}
