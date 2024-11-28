import * as React from 'react';
import { Flex } from '@aws-amplify/ui-react';
import { StorageBrowser, useView } from './MockStorageBrowser';

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
