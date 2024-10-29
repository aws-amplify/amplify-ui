import React from 'react';
import { MergeBaseElements } from '@aws-amplify/ui-react-core/elements';

import {
  LocationActions,
  locationActionsDefault,
} from './do-not-import-from-here/locationActions';
import { StorageBrowserElements } from './context/elements';
import { ComponentsProvider } from './ComponentsProvider';
import { createTempActionsProvider } from './do-not-import-from-here/createTempActionsProvider';
import { ErrorBoundary } from './ErrorBoundary';

import {
  createConfigurationProvider,
  RegisterAuthListener,
  StoreProvider,
  StoreProviderProps,
} from './providers';
import { ListLocations } from './storage-internal';
import { StorageBrowserDefault } from './StorageBrowserDefault';
import {
  Views,
  LocationActionView,
  LocationDetailView,
  LocationsView,
  ViewsProvider,
} from './views';
import { GetLocationCredentials } from './credentials/types';

export interface Config {
  accountId?: string;
  getLocationCredentials: GetLocationCredentials;
  listLocations: ListLocations;
  registerAuthListener: RegisterAuthListener;
  region: string;
}

const validateRegisterAuthListener = (registerAuthListener: any) => {
  if (typeof registerAuthListener !== 'function') {
    throw new Error(
      'StorageManager: `registerAuthListener` must be a function.'
    );
  }
};

export interface CreateStorageBrowserInput {
  actions?: LocationActions;
  config: Config;
  elements?: Partial<StorageBrowserElements>;
}

export interface StorageBrowserProps {
  views?: Partial<Views>;
}

export interface StorageBrowserComponent<T = {}> extends Views {
  (
    props: StorageBrowserProps & Exclude<T, keyof StorageBrowserProps>
  ): React.JSX.Element;
  displayName: string;
  Provider: (props: StoreProviderProps) => React.JSX.Element;
}

export interface ResolvedStorageBrowserElements<
  T extends Partial<StorageBrowserElements>,
> extends MergeBaseElements<StorageBrowserElements, T> {}

export function createStorageBrowser(input: CreateStorageBrowserInput): {
  StorageBrowser: StorageBrowserComponent;
} {
  validateRegisterAuthListener(input.config.registerAuthListener);

  const { accountId, registerAuthListener, getLocationCredentials, region } =
    input.config;

  // will be replaced, contains the v0 actons API approach
  const TempActionsProvider = createTempActionsProvider({
    ...input,
    actions: locationActionsDefault,
  });

  const ConfigurationProvider = createConfigurationProvider({
    accountId,
    displayName: 'ConfigurationProvider',
    getLocationCredentials,
    region,
    registerAuthListener,
  });

  /**
   * Provides state, configuration and action values that are shared between
   * the primary View components
   */
  function Provider({ children, ...props }: StoreProviderProps) {
    return (
      <StoreProvider {...props}>
        <ConfigurationProvider>
          <TempActionsProvider>
            <ComponentsProvider elements={input.elements}>
              {children}
            </ComponentsProvider>
          </TempActionsProvider>
        </ConfigurationProvider>
      </StoreProvider>
    );
  }

  const StorageBrowser: StorageBrowserComponent = ({ views }) => (
    <ErrorBoundary>
      <Provider>
        <ViewsProvider views={views}>
          <StorageBrowserDefault />
        </ViewsProvider>
      </Provider>
    </ErrorBoundary>
  );

  StorageBrowser.LocationActionView = LocationActionView;
  StorageBrowser.LocationDetailView = LocationDetailView;
  StorageBrowser.LocationsView = LocationsView;

  StorageBrowser.Provider = Provider;

  StorageBrowser.displayName = 'StorageBrowser';

  return { StorageBrowser };
}
