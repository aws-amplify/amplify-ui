import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';
import {
  signInWithRedirect,
  SignInWithRedirectInput,
  signOut,
} from 'aws-amplify/auth';
import {
  createFederatedIdentities,
  getProviderConfig,
} from '@aws-amplify/ui-react';
import { useIsSignedIn } from '@aws-amplify/ui-react-core';

import '@aws-amplify/ui-react/styles.css';
import './styles.css';

Amplify.configure(awsExports);

function handleSignInWithRedirect(
  input: SignInWithRedirectInput
): Promise<void> {
  const { provider } = input;

  if (typeof provider === 'string') {
    console.log('Supported provider sign-in: ' + provider);
  } else {
    console.log('Custom provider sign-in: ' + provider?.custom);
  }
  return signInWithRedirect(input);
}

const { FederatedIdentities } = createFederatedIdentities({
  providers: getProviderConfig(Amplify.getConfig()),
  handleSignInWithRedirect: handleSignInWithRedirect,
});

export default function FederatedIdentitiesStandAlone() {
  const signedInState = useIsSignedIn();

  return signedInState.isLoading ? (
    <p>loading</p>
  ) : signedInState.data ? (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  ) : (
    <div className="outer-container">
      <div className="inner-container">
        <FederatedIdentities />
      </div>
    </div>
  );
}
