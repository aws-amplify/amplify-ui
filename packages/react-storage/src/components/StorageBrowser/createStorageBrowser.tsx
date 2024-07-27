import React from 'react';

import { MergeBaseElements } from '@aws-amplify/ui-react-core/elements';

import { Permission } from './context/actions/types';
import { StorageBrowserElements } from './context/elements';
import createProvider, { CreateProviderInput } from './createProvider';
import { LocationsView, LocationDetailView } from './Views';

export interface CreateStorageBrowserInput<
  T = StorageBrowserElements,
  K = Permission,
> extends CreateProviderInput<T, K> {}

export interface StorageBrowser<T extends StorageBrowserElements> {
  (): React.JSX.Element;
  LocationDetailView: LocationDetailView<T>;
  LocationsView: LocationsView<T>;
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
  // return <LocationsView />;
  return <>Default behavior!</>;
}

export function createStorageBrowser<
  T extends Partial<StorageBrowserElements>,
  K extends Permission,
>(
  input: CreateStorageBrowserInput<T, K>
): {
  StorageBrowser: StorageBrowser<ResolvedStorageBrowserElements<T>>;
} {
  const Provider = createProvider(input);

  const StorageBrowser: StorageBrowser<
    ResolvedStorageBrowserElements<T>
  > = () => (
    <Provider>
      <DefaultStorageBrowser />
    </Provider>
  );

  StorageBrowser.Provider = Provider;
  StorageBrowser.LocationDetailView = LocationDetailView;
  StorageBrowser.LocationsView = LocationsView;

  // @ts-expect-error - force allow `displayName`
  StorageBrowser.displayName = 'StorageBrowser';

  return { StorageBrowser };
}
