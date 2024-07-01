import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

const amplifyOutputs = (
  await import(
    `@environments/auth/auth-with-totp-and-sms-mfa/${process.env.PATH}`
  )
).default;

Amplify.configure(amplifyOutputs);

export default function SignInTotpSmsMfa() {
  return (
    <Authenticator>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
