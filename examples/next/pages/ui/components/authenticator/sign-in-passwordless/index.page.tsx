import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function PasswordlessExample() {
  return (
    <Authenticator
      passwordlessAuthOptions={{
        hiddenAuthMethods: [],
        preferredAuthMethod: 'EMAIL_OTP',
        passkeyRegistrationPrompts: true,
      }}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
