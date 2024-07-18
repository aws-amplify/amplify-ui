import React from 'react';

import { StorageBrowserElements } from './context/elements';
import createProvider from './createProvider';
import {
  LocationDetailView,
  LocationsListView,
  DividerControl,
  HistoryControl,
  RefreshControl,
  SearchControl,
  TitleControl,
} from './Views';
import { Controls, CreateStorageBrowserInput, StorageBrowser } from './types';

export default function createStorageBrowser<T extends StorageBrowserElements>({
  elements: _elements,
}: CreateStorageBrowserInput<Partial<T>> = {}): {
  StorageBrowser: StorageBrowser<T>;
} {
  const elements = { ..._elements, StorageBrowserElements };
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
    Divider: DividerControl,
    // @ts-expect-error FIXME -> `Controls` need to be nested in `View` components
    History: HistoryControl,
    // @ts-expect-error FIXME -> `Controls` need to be nested in `View` componentss
    Refresh: RefreshControl,
    // @ts-expect-error FIXME -> `Controls` need to be nested in `View` components
    Search: SearchControl,
    // @ts-expect-error FIXME -> `Controls` need to be nested in `View` components
    Title: TitleControl,
  };

  StorageBrowser.Provider = Provider;
  StorageBrowser.LocationsListView = LocationsListView;
  StorageBrowser.LocationDetailView = LocationDetailView;
  StorageBrowser.Controls = Controls;

  return { StorageBrowser };
}
