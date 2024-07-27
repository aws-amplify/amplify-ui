import { createStorageBrowser } from '@aws-amplify/ui-react-storage';
import { IconSearch as _IconSearch } from '@aws-amplify/ui-react/internal';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';

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
      <StorageBrowser.LocationDetailView />;
    </StorageBrowser.Provider>
  );
}
