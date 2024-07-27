import React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';

const { StorageBrowser } = createStorageBrowser({
  config: {
    listLocations: () =>
      Promise.resolve({ locations: [], nextToken: undefined }),
  },
});

// NOT WORKING CURRENTLY
export default function Example() {
  return (
    <StorageBrowser.Provider>
      <StorageBrowser.LocationsView />
    </StorageBrowser.Provider>
  );
}
