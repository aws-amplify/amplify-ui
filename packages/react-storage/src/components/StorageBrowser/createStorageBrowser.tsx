import React from 'react';

import { LocationView, LocationsView } from './views';

interface StorageBrowser {
  (): JSX.Element;
  LocationsView: typeof LocationsView;
  LocationView: typeof LocationView;
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

  StorageBrowser.LocationsView = LocationsView;
  StorageBrowser.LocationView = LocationView;

  return { StorageBrowser };
}
