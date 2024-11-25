import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { Button, Flex } from '@aws-amplify/ui-react';
import { mockConfig } from './mockConfig';

const { StorageBrowser, useView } = createStorageBrowser({
  config: mockConfig,
});

function LocationDetailView() {
  const state = useView('LocationDetail');

  return (
    <StorageBrowser.LocationDetailView.Provider {...state}>
      <Flex direction="row">
        <StorageBrowser.LocationDetailView.Refresh />
        <StorageBrowser.LocationDetailView.Search />
      </Flex>
      <StorageBrowser.LocationDetailView.LocationItemsTable />
      <StorageBrowser.LocationDetailView.Pagination />
    </StorageBrowser.LocationDetailView.Provider>
  );
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <LocationDetailView />
    </StorageBrowser.Provider>
  );
}
