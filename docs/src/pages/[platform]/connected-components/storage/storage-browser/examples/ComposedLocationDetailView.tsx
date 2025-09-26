import * as React from 'react';
import { Flex } from '@aws-amplify/ui-react';
import { StorageBrowser, useView } from './StorageBrowser';

function LocationDetailView() {
  const state = useView('LocationDetail');

  return (
    <StorageBrowser.LocationDetailView.Provider {...state}>
      <Flex direction="row">
        <StorageBrowser.LocationDetailView.Pagination />
        <StorageBrowser.LocationDetailView.Refresh />
        <StorageBrowser.LocationDetailView.Search />
      </Flex>
      <Flex direction="column" position="relative">
        <StorageBrowser.LocationDetailView.LocationItemsTable />

        <StorageBrowser.LocationDetailView.FilePreview />
      </Flex>
    </StorageBrowser.LocationDetailView.Provider>
  );
}

export default function Example() {
  return <LocationDetailView />;
}
