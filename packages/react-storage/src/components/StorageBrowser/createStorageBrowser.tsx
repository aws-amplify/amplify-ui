import React from 'react';

import { LocationDetailView, LocationsListView } from './views';

interface StorageBrowser {
  (): JSX.Element;
  LocationsListView: typeof LocationsListView;
  LocationDetailView: typeof LocationDetailView;
}

export default function createStorageBrowser(): {
  StorageBrowser: StorageBrowser;
} {
  function StorageBrowser(): JSX.Element {
    return (
      <div>
        <p>Hello World!</p>
      </div>
    );
  }

  StorageBrowser.LocationsListView = LocationsListView;
  StorageBrowser.LocationDetailView = LocationDetailView;

  return { StorageBrowser };
}
