import { Amplify } from 'aws-amplify';
import { AuthContext } from '@aws-amplify/ui';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const customServices: AuthContext['services'] = {
  handleSignIn: async () => {
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
  },
  handleConfirmSignIn: async ({ challengeResponse }) => {
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
