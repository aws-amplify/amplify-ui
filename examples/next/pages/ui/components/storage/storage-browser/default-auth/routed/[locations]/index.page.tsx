import React from 'react';
import { useRouter } from 'next/router';

import { signOut } from 'aws-amplify/auth';
import { Button, Flex } from '@aws-amplify/ui-react';

import { StorageBrowser } from '../StorageBrowser';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

function Locations() {
  const router = useRouter();

  return (
    <Flex direction="column">
      <Button
        onClick={() => {
          signOut();
          router.replace(router.pathname.replace('[locations]', ''));
        }}
      >
        Sign Out
      </Button>
      <StorageBrowser.Provider>
        <StorageBrowser.Provider>
          <StorageBrowser.LocationsView
            onNavigate={(destination) => {
              router.push({
                pathname: `${router.pathname}/location-detail`,
                query: { ...destination },
              });
            }}
          />
        </StorageBrowser.Provider>
      </StorageBrowser.Provider>
    </Flex>
  );
}

export default Locations;
