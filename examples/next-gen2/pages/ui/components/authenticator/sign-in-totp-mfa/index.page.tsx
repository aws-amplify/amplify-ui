import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import amplifyOutputs from './amplify_outputs';
Amplify.configure(amplifyOutputs);

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
