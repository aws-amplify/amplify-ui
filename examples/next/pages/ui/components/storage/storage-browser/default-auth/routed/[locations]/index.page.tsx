import React from 'react';
import { useRouter } from 'next/router';

import { signOut } from 'aws-amplify/auth';
import { Button, Flex } from '@aws-amplify/ui-react';

import { StorageBrowser } from '../StorageBrowser';

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
      <StorageBrowser.Provider
        displayText={{ LocationsView: { title: 'Home - Routed Amplify Auth' } }}
      >
        <StorageBrowser.LocationsView
          onNavigate={(location) => {
            router.push({
              pathname: `${router.pathname}/location-detail`,
              query: { ...location },
            });
          }}
        />
      </StorageBrowser.Provider>
    </Flex>
  );
}

export default Locations;
