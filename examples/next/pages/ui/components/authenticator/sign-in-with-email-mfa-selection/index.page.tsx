import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { AuthContext, emailRegex } from '@aws-amplify/ui';
Amplify.configure(awsExports);

const customServices: AuthContext['services'] = {
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
        },
      };
    }

    if (/^\d+$/.test(challengeResponse)) {
      if (challengeResponse.length !== 6) {
        throw new Error('Invalid code or auth state for the user.');
      }
      return {
        isSignedIn: true,
        nextStep: {
          signInStep: 'DONE',
        },
      };
    }
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
