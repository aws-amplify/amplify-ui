import React from 'react';
import { Button } from '@aws-amplify/ui-react';
import { MergeBaseElements } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from './context/elements';
import createProvider from './createProvider';
import { LocationsListView, LocationDetailView } from './Views';

export interface CreateStorageBrowserInput<T> {
  elements?: T;
}

export interface StorageBrowser<T extends StorageBrowserElements> {
  (): React.JSX.Element;
  LocationDetailView: LocationDetailView<T>;
  LocationsListView: LocationsListView<T>;
  Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
}

interface ResolvedStorageBrowserElements<
  T extends Partial<StorageBrowserElements>,
> extends MergeBaseElements<StorageBrowserElements, T> {}

function DefaultStorageBrowser(): React.JSX.Element {
  // TODO
  // if (hasSelectedLocation) {
  // return <LocationDetailView />
  // }
  // return <LocationsListView />;
  return <>Default behavior!</>;
}

export function createStorageBrowser<
  T extends Partial<StorageBrowserElements>,
>({ elements }: CreateStorageBrowserInput<T> = {}): {
  StorageBrowser: StorageBrowser<ResolvedStorageBrowserElements<T>>;
} {
  const Provider = createProvider({ elements });

  const StorageBrowser: StorageBrowser<
    ResolvedStorageBrowserElements<T>
  > = () => (
    <Provider>
      <DefaultStorageBrowser />
    </Provider>
  );

  StorageBrowser.Provider = Provider;
  StorageBrowser.LocationDetailView = LocationDetailView;
  StorageBrowser.LocationsListView = LocationsListView;

  // @ts-expect-error - force allow `displayName`
  StorageBrowser.displayName = 'StorageBrowser';

  return { StorageBrowser };
}

// below is functioning as a "type canary", will start yelling if `elements`
// inference is broken
const {
  StorageBrowser: {
    LocationsListView: { Controls },
  },
} = createStorageBrowser({ elements: { Button } });
const _SillyTest = () => (
  <Controls.Refresh.Button alignContent={'-moz-initial'} />
);
