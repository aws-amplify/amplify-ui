import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function SignInTotpMfa() {
  const formFields = {
    setupTotp: { QR: { totpIssuer: 'My Web App' } },
  };

  return (
    <>
      <Authenticator formFields={formFields}>
        {({ signOut, user }) => (
          <>
            <span>{user.username}</span>
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </Authenticator>
    </>
  );
}
