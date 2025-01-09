import React from 'react';
import { useRouter } from 'next/router';

import { Flex } from '@aws-amplify/ui-react';

import { SignOutButton } from '../components';
import { StorageBrowser } from '../StorageBrowser';

import '@aws-amplify/ui-react-storage/styles.css';

function Locations() {
  const router = useRouter();

  return (
    <Flex direction="column">
      <SignOutButton
        onSignOut={() => {
          router.replace(router.pathname.replace('[locations]', ''));
        }}
      />

      <StorageBrowser.Provider
        displayText={{ LocationsView: { title: 'Home - Routed Managed Auth' } }}
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
