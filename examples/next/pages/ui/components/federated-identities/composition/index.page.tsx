import { Amplify } from 'aws-amplify';
import {
  createFederatedIdentities,
  getProviderConfig,
} from '@aws-amplify/ui-react';
import { useIsSignedIn } from '@aws-amplify/ui-react-core';
import {
  customGroup,
  customListItem,
  customButton,
  customIcon,
  customText,
} from './customElements';

import awsExports from './aws-exports';
import { signOut } from 'aws-amplify/auth';
import './styles.css';

Amplify.configure(awsExports);

const { FederatedIdentities } = createFederatedIdentities({
  providers: getProviderConfig(Amplify.getConfig()),
  elements: {
    Group: customGroup,
    ListItem: customListItem,
    Button: customButton,
    Icon: customIcon,
    Text: customText,
  },
});

export default function FederatedIdentitiesWithComposability() {
  const signedInState = useIsSignedIn();
  return signedInState.data ? (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  ) : (
    <FederatedIdentities>
      <p>Here is a google button:</p>
      <FederatedIdentities.Identity providerName="google" />
      <p>Here is an amazon button:</p>
      <FederatedIdentities.Identity providerName="amazon">
        <p>Click here to sign in with Amazon!</p>
      </FederatedIdentities.Identity>
    </FederatedIdentities>
  );
}
