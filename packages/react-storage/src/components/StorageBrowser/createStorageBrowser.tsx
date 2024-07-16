import React from 'react';

import { StorageBrowserElements } from './context/elements';
import createProvider from './createProvider';
import { LocationDetailView, LocationsListView, SearchControl } from './Views';
import { Controls, CreateStorageBrowserInput, StorageBrowser } from './types';

export default function createStorageBrowser<T extends StorageBrowserElements>({
  elements: _elements,
}: CreateStorageBrowserInput<Partial<T>> = {}): {
  StorageBrowser: StorageBrowser<T>;
} {
  const elements = { ..._elements, ...StorageBrowserElements };
  const Provider = createProvider({ elements });

  function StorageBrowser(): React.JSX.Element {
    return (
      <Provider>
        <div>
          <p>Hello World!</p>
        </div>
      </Provider>
    );
  }

  // @ts-expect-error FIXME -> `Controls` need to be nested in `View` components
  const Controls: Controls<T> = { Search: SearchControl };

  StorageBrowser.Provider = Provider;
  StorageBrowser.LocationsListView = LocationsListView;
  StorageBrowser.LocationDetailView = LocationDetailView;
  StorageBrowser.Controls = Controls;

  return { StorageBrowser };
}
