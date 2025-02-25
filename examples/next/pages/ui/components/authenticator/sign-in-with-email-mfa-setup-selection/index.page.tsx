import { Amplify } from 'aws-amplify';
import { emailRegex } from '@aws-amplify/ui';
import { Authenticator, AuthenticatorProps } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const customServices: AuthenticatorProps['services'] = {
  handleSignUp: async () => {
    return {
      isSignUpComplete: true,
      userId: '******************',
      nextStep: {
        signUpStep: 'COMPLETE_AUTO_SIGN_IN',
      },
    };
  },
  handleSignIn: async () => {
    return {
      isSignedIn: false,
      nextStep: {
        signInStep: 'CONTINUE_SIGN_IN_WITH_MFA_SETUP_SELECTION',
        allowedMFATypes: ['EMAIL', 'TOTP'],
      },
    };
  },
  handleConfirmSignIn: async ({ challengeResponse }) => {
    if (challengeResponse === 'EMAIL') {
      return {
        isSignedIn: false,
        nextStep: {
          signInStep: 'CONTINUE_SIGN_IN_WITH_EMAIL_SETUP',
        },
      };
    }
    if (emailRegex.test(challengeResponse)) {
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
    if (/^\d{6}$/.test(challengeResponse)) {
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
