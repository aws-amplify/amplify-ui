import React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';

const { StorageBrowser } = createStorageBrowser();

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <StorageBrowser.LocationsListView />
    </StorageBrowser.Provider>
  );
}