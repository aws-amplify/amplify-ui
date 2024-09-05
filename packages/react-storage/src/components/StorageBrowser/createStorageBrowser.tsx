import React from 'react';
import { MergeBaseElements } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from './context/elements';
import createProvider, { CreateProviderInput } from './createProvider';
import { StorageBrowserDefault } from './StorageBrowserDefault';
import {
  Views,
  LocationActionView,
  LocationDetailView,
  LocationsView,
} from './views';
import { useControl } from './context/control';
import { locationActionsDefault } from './context/locationActions';

const validateRegisterAuthListener = (registerAuthListener: any) => {
  if (typeof registerAuthListener !== 'function') {
    throw new Error(
      'StorageManager: `registerAuthListener` must be a function.'
    );
  }
};

export interface CreateStorageBrowserInput
  extends Omit<CreateProviderInput, 'actions'> {}

export interface StorageBrowserProps {
  views?: Views;
}

export interface StorageBrowserComponent extends Required<Views> {
  (props: StorageBrowserProps): React.JSX.Element;
  displayName: string;
  Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
}

export interface ResolvedStorageBrowserElements<
  T extends Partial<StorageBrowserElements>,
> extends MergeBaseElements<StorageBrowserElements, T> {}

export function createStorageBrowser(input: CreateStorageBrowserInput): {
  StorageBrowser: StorageBrowserComponent;
  useControl: typeof useControl;
} {
  validateRegisterAuthListener(input.config.registerAuthListener);

  const Provider = createProvider({
    ...input,
    actions: locationActionsDefault,
  });

  const StorageBrowser: StorageBrowserComponent = ({ views }) => (
    <Provider views={views}>
      <StorageBrowserDefault />
    </Provider>
  );

  StorageBrowser.LocationActionView = LocationActionView;
  StorageBrowser.LocationDetailView = LocationDetailView;
  StorageBrowser.LocationsView = LocationsView;

  StorageBrowser.Provider = Provider;

  StorageBrowser.displayName = 'StorageBrowser';

  return { StorageBrowser, useControl };
}
