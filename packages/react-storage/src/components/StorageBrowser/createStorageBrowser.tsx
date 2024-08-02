import React from 'react';
import { MergeBaseElements } from '@aws-amplify/ui-react-core/elements';

import { Permission } from './context/actions/types';
import { StorageBrowserElements } from './context/elements';
import createProvider, { CreateProviderInput } from './createProvider';
import { LocationsView, LocationDetailView, LocationActionView } from './Views';
import { useControl } from './context/controls';

export interface CreateStorageBrowserInput<T, K>
  extends CreateProviderInput<T, K> {}

export interface StorageBrowser<T extends StorageBrowserElements> {
  (): React.JSX.Element;
  LocationDetailView: LocationDetailView<T>;
  LocationsView: LocationsView<T>;
  Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
}

interface ResolvedStorageBrowserElements<
  T extends Partial<StorageBrowserElements>,
> extends MergeBaseElements<StorageBrowserElements, T> {}

/**
 * Handles default `StorageBrowser` behavior:
 * - render `LocationsView` on init
 * - render `LocationDetailView` on location selection
 * - TODO: render `ActionView` on action selection
 */
function DefaultStorageBrowser(): React.JSX.Element {
  const [{ location }] = useControl({ type: 'NAVIGATE' });
  const [{ selected }] = useControl({ type: 'ACTION_SELECT' });

  const { actionType } = selected;

  if (actionType) {
    return <LocationActionView />;
  } else if (location) {
    return <LocationDetailView />;
  } else return <LocationsView />;
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
