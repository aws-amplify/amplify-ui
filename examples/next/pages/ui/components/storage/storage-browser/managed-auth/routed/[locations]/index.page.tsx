import React from 'react';
import { useRouter } from 'next/router';

import { Flex } from '@aws-amplify/ui-react';

import { SignOutButton } from '../components';
import { StorageBrowser, useView } from '../StorageBrowser';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

function TemporaryLogs() {
  try {
    useView('CreateFolder');
  } catch (e) {
    console.log('CreateFolder error', e.message);
  }

  try {
    useView('Upload');
  } catch (e) {
    console.log('Upload error', e.message);
  }

  const locations = useView('Locations');
  console.log('locations', locations);

  const detail = useView('LocationDetail');
  console.log('detail', detail);

  const deleteState = useView('Delete');
  console.log('delete', deleteState);
  return null;
}
function Locations() {
  const router = useRouter();

  return (
    <Flex direction="column">
      <SignOutButton
        onSignOut={() => {
          router.replace(router.pathname.replace('[locations]', ''));
        }}
      />

      <StorageBrowser.Provider>
        <TemporaryLogs />
        <StorageBrowser.LocationsView
          onNavigate={(destination) => {
            router.push({
              pathname: `${router.pathname}/location-detail`,
              query: { ...destination },
            });
          }}
        />
      </StorageBrowser.Provider>
    </Flex>
  );
}

export default Locations;
