import { Amplify } from 'aws-amplify';

import '@aws-amplify/ui-react/styles.css';
import {
  Authenticator,
  createFederatedIdentities,
  getProviderConfig,
} from '@aws-amplify/ui-react';

import awsExports from './aws-exports';
import { signOut } from 'aws-amplify/auth';
Amplify.configure(awsExports);

const { FederatedIdentities: SignInFlow } = createFederatedIdentities({
  providers: getProviderConfig(Amplify.getConfig()),
});

const { FederatedIdentities: SignUpFlow } = createFederatedIdentities({
  providers: getProviderConfig(Amplify.getConfig()),
  displayText: (displayName: string) => {
    return `Sign Up with ${displayName}`;
  },
});

const components = {
  SignIn: {
    FederatedSignIn() {
      return <SignInFlow />;
    },
  },
  SignUp: {
    FederatedSignIn() {
      return <SignUpFlow />;
    },
  },
};

export default function AuthenticatorWithFederation() {
  return (
    <Authenticator components={components}>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
    </Authenticator>
  );
}
