import React from 'react';

import { StorageBrowserElements } from './context/elements';
import createProvider from './createProvider';
import {
  HistoryControl,
  LocationDetailView,
  LocationsListView,
  SearchControl,
} from './Views';
import { Controls, CreateStorageBrowserInput, StorageBrowser } from './types';

export default function createStorageBrowser<
  T extends Partial<StorageBrowserElements>,
>({ elements }: CreateStorageBrowserInput<T> = {}): {
  StorageBrowser: StorageBrowser<T>;
} {
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

  const Controls: Controls<T> = {
    // @ts-expect-error FIXME -> `Controls` need to be nested in `View` components
    History: HistoryControl,
    Search: SearchControl,
  };

  StorageBrowser.Provider = Provider;
  StorageBrowser.LocationsListView = LocationsListView;
  StorageBrowser.LocationDetailView = LocationDetailView;
  StorageBrowser.Controls = Controls;

  return { StorageBrowser };
}
