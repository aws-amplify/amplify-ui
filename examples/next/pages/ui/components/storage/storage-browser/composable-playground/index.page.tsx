import React from 'react';

import { createStorageBrowser } from '@aws-amplify/ui-react-storage';

import { auth, managedAuthAdapter } from './managedAuthAdapter';

import { Flex } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

const { StorageBrowser } = createStorageBrowser({
  config: managedAuthAdapter,
});

function Example() {
  const [authenticated, setAuthenticated] = React.useState(false);
  React.useEffect(() => {
    if (!authenticated) {
      auth
        .credentialsProvider()
        .then(() => {
          setAuthenticated(true);
        })
        .catch(({ message }: Error) => {
          console.error(`??????: ${message}`);
          setAuthenticated(false);
        });
    }
  }, [authenticated]);

  return !authenticated ? (
    <span>Authenticating...</span>
  ) : (
    <>
      <StorageBrowser />
      {/* <StorageBrowser.Provider>
        <Flex>
          <Flex direction={'column'}>
            <StorageBrowser.LocationsView />
          </Flex>
          <Flex direction={'column'}>
            <StorageBrowser.LocationDetailView />
          </Flex>
        </Flex>
      </StorageBrowser.Provider> */}
    </>
  );
}

export default Example;
