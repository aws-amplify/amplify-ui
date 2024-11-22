import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { Button, Flex } from '@aws-amplify/ui-react';
import { mockConfig } from './mockConfig';

const { StorageBrowser, useView } = createStorageBrowser({
  config: mockConfig,
});

function LocationsView() {
  const state = useView('Locations');

  return (
    <StorageBrowser.LocationsView.Provider {...state}>
      <Flex direction="row">
        <StorageBrowser.LocationsView.Refresh />
        <StorageBrowser.LocationsView.Search />
      </Flex>
      <StorageBrowser.LocationsView.LocationsTable />
      <StorageBrowser.LocationsView.Pagination />
    </StorageBrowser.LocationsView.Provider>
  );
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <LocationsView />
    </StorageBrowser.Provider>
  );
}
