import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-phone-number/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

export default function AuthenticatorWithPhone() {
  return (
    <Authenticator initialState="signUp">
      {({ signOut }) => (
        <>
          <h1>Hello</h1>
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </Authenticator>
  );
}
