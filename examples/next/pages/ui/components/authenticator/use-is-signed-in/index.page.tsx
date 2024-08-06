import { Amplify } from 'aws-amplify';
import { useIsSignedIn } from '@aws-amplify/ui-react-core';
import { signOut } from 'aws-amplify/auth';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function AuthenticatorWithUseIsSignedIn() {
  const signedInState = useIsSignedIn();
  return signedInState.isLoading ? (
    <p>loading</p>
  ) : signedInState.data.isSignedIn ? (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  ) : (
    <Authenticator />
  );
}
