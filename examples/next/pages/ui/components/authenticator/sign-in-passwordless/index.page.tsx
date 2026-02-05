import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

/**
 * Passwordless Authentication Example
 *
 * This example demonstrates passwordless authentication with EMAIL_OTP as the preferred method.
 * The backend is configured to support multiple authentication methods:
 * - EMAIL_OTP
 * - SMS_OTP
 * - WEB_AUTHN (passkeys)
 * - PASSWORD (traditional)
 *
 * To test different preferred methods, modify the props:
 * - For SMS_OTP: Set preferredChallenge to 'SMS_OTP'
 * - For WEB_AUTHN: Set preferredChallenge to 'WEB_AUTHN'
 * - For PASSWORD: Set preferredChallenge to 'PASSWORD'
 *
 * Users can switch between available methods using "Other sign-in options" button.
 */
export default function PasswordlessExample() {
  return (
    <Authenticator
      passwordless={{
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
