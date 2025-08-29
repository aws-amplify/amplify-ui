import * as React from 'react';
import { Flex } from '@aws-amplify/ui-react';
import { StorageBrowser, useView } from './StorageBrowser';
import CustomFilePreview from './CustomUIFilePreview';

function LocationDetailView() {
  const state = useView('LocationDetail');
  const { filePreviewState, onCloseFilePreview } = state;

  return (
    <StorageBrowser.LocationDetailView.Provider {...state}>
      <Flex direction="row">
        <StorageBrowser.LocationDetailView.Pagination />
        <StorageBrowser.LocationDetailView.Refresh />
        <StorageBrowser.LocationDetailView.Search />
      </Flex>
      <Flex direction="column" position="relative">
        <StorageBrowser.LocationDetailView.LocationItemsTable />

        <CustomFilePreview
          filePreviewState={filePreviewState}
          onCloseFilePreview={onCloseFilePreview}
        />
      </Flex>
    </StorageBrowser.LocationDetailView.Provider>
  );
}

export default function Example() {
  return <LocationDetailView />;
}
