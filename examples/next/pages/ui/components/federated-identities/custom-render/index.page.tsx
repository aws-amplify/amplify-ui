import { Amplify } from 'aws-amplify';

import {
  AuthProvider,
  createFederatedIdentities,
  getProviderConfig,
  ProviderData,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useIsSignedIn } from '@aws-amplify/ui-react-core';
import { capitalize } from '@aws-amplify/ui';

import awsExports from './aws-exports';
import { signInWithRedirect, signOut } from 'aws-amplify/auth';
Amplify.configure(awsExports);
import './styles.css';

const { FederatedIdentities } = createFederatedIdentities({
  providers: getProviderConfig(Amplify.getConfig()),
});

function myCustomRender(data: ProviderData): React.JSX.Element {
  const { providerName, displayName, icon } = data;
  return (
    <div>
      <button
        className="button"
        onClick={() =>
          signInWithRedirect({
            provider: capitalize(providerName) as AuthProvider,
          })
        }
      >
        Click here for {displayName} login!
      </button>
    </div>
  );
}

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
        <FederatedIdentities renderButton={myCustomRender} />
      </div>
    </div>
  );
}
