import { Amplify } from 'aws-amplify';

import { signInWithRedirect, signOut } from 'aws-amplify/auth';
import { capitalize } from '@aws-amplify/ui';
import {
  createFederatedIdentities,
  getProviderConfig,
  ProviderData,
} from '@aws-amplify/ui-react';
import { useIsSignedIn } from '@aws-amplify/ui-react-core';

import awsExports from './aws-exports';

import './styles.css';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

const { FederatedIdentities } = createFederatedIdentities({
  providers: getProviderConfig(Amplify.getConfig()),
});

type AuthProvider = 'Amazon' | 'Apple' | 'Google' | 'Facebook';

function myCustomRender(data: ProviderData): React.JSX.Element {
  const { providerName, displayName } = data;
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
