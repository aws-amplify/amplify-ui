import React from 'react';

import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';

import { auth, managedAuthAdapter } from '../managedAuthAdapter';

import { Button, Flex } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

const { StorageBrowser } = createStorageBrowser({
  config: managedAuthAdapter,
});

function Example() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  return !authenticated ? (
    <Flex>
      <Button
        onClick={() => {
          setIsLoading(true);
          auth.signIn({
            onSignIn: () => {
              setAuthenticated(true);
              setIsLoading(false);
            },
            onError: (e: Error) => {
              setErrorMessage(e.message);
              setIsLoading(false);
            },
          });
        }}
      >
        Sign In
      </Button>
      {isLoading ? <span>Authenticating...</span> : null}
      {errorMessage ? <span>{errorMessage}</span> : null}
    </Flex>
  ) : (
    <>
      <Button
        onClick={() => {
          auth.signOut({ onSignOut: () => setAuthenticated(false) });
        }}
      >
        Sign Out
      </Button>
      <StorageBrowser.Provider>
        <Flex>
          <Flex direction={'column'}>
            <StorageBrowser.LocationsView />
          </Flex>
          <Flex direction={'column'}>
            <StorageBrowser.LocationDetailView />
          </Flex>
        </Flex>
      </StorageBrowser.Provider>
    </>
  );
}

export default Example;
