import React from 'react';
import { MergeBaseElements } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from './context/elements';
import createProvider, { CreateProviderInput } from './createProvider';
import { LocationsView, LocationDetailView, LocationActionView } from './Views';
import { useControl } from './context/controls';
import { ACTIONS_DEFAULT } from './context/controls/locationActions';

const validateRegisterAuthListener = (registerAuthListener: any) => {
  if (typeof registerAuthListener !== 'function') {
    throw new Error(
      'StorageManager: `registerAuthListener` must be a function.'
    );
  }
};

export interface CreateStorageBrowserInput
  extends Omit<CreateProviderInput, 'actions'> {}

export interface StorageBrowserComponent {
  (): React.JSX.Element;
  LocationDetailView: () => React.JSX.Element;
  LocationsView: () => React.JSX.Element;
  Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
}

export interface ResolvedStorageBrowserElements<
  T extends Partial<StorageBrowserElements>,
> extends MergeBaseElements<StorageBrowserElements, T> {}

/**
 * Handles default `StorageBrowser` behavior:
 * - render `LocationsView` on init
 * - render `LocationDetailView` on location selection
 * - render `ActionView` on action selection
 */
function DefaultStorageBrowser(): React.JSX.Element {
  const [{ location }] = useControl({ type: 'NAVIGATE' });
  const [{ selected }] = useControl({ type: 'ACTION_SELECT' });

  const { type } = selected;

  if (type) {
    return <LocationActionView />;
  }

  if (location) {
    return <LocationDetailView />;
  }

  return <LocationsView />;
}

export function createStorageBrowser(input: CreateStorageBrowserInput): {
  StorageBrowser: StorageBrowserComponent;
} {
  validateRegisterAuthListener(input.config.registerAuthListener);

  const Provider = createProvider({ ...input, actions: ACTIONS_DEFAULT });

  const StorageBrowser = () => (
    <Provider>
      <DefaultStorageBrowser />
    </Provider>
  );

  StorageBrowser.Provider = Provider;
  StorageBrowser.LocationDetailView = LocationDetailView;
  StorageBrowser.LocationsView = LocationsView;

  StorageBrowser.displayName = 'StorageBrowser';

  return { StorageBrowser };
}
