import { Amplify } from 'aws-amplify';
import { Authenticator, AuthenticatorProps } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const customServices: AuthenticatorProps['services'] = {
  handleSignIn: async () => {
    return {
      isSignedIn: false,
      nextStep: {
        signInStep: 'CONTINUE_SIGN_IN_WITH_MFA_SELECTION',
        allowedMFATypes: ['EMAIL', 'TOTP'],
      },
    };
  },
  handleConfirmSignIn: async ({ challengeResponse }) => {
    if (challengeResponse === 'EMAIL') {
      return {
        isSignedIn: false,
        nextStep: {
          signInStep: 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE',
          codeDeliveryDetails: {
            destination: 'a***@e***.com',
            deliveryMedium: 'EMAIL',
            attributeName: 'email',
          },
        },
      };
    }

    if (challengeResponse === '123456') {
      return {
        isSignedIn: true,
        nextStep: {
          signInStep: 'DONE',
        },
      };
    }
    throw new Error('Invalid code or auth state for the user.');
  },
  getCurrentUser: async () => {
    return {
      userId: '******************',
      username: 'james',
    };
  },
};

export default function App() {
  return (
    <Authenticator services={customServices}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
