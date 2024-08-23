import { Amplify } from 'aws-amplify';

import {
  createFederatedIdentities,
  getProviderConfig,
  UseHandleSignInWithRedirectProvider,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useIsSignedIn } from '@aws-amplify/ui-react-core';

import awsExports from './aws-exports';
import {
  signInWithRedirect,
  SignInWithRedirectInput,
  signOut,
} from 'aws-amplify/auth';
Amplify.configure(awsExports);
import './styles.css';

const { FederatedIdentities, useHandleSignInWithRedirect } =
  createFederatedIdentities({
    providers: getProviderConfig(Amplify.getConfig()),
  });

function InnerComponent() {
  const signedInState = useIsSignedIn();

  const [redirectState] = useHandleSignInWithRedirect();

  return redirectState.isLoading ? (
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

export default function FederatedIdentitiesWithRedirectHook() {
  return (
    <UseHandleSignInWithRedirectProvider
      handleSignInWithRedirect={handleSignInWithRedirect}
    >
      <InnerComponent />
    </UseHandleSignInWithRedirectProvider>
  );
}
