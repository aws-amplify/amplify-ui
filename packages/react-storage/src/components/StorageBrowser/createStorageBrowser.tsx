import React from 'react';
import { MergeBaseElements } from '@aws-amplify/ui-react-core/elements';

import {
  LocationActions,
  locationActionsDefault,
} from './do-not-import-from-here/locationActions';
import { createTempActionsProvider } from './do-not-import-from-here/createTempActionsProvider';

import { DEFAULT_COMPOSABLES } from './composables';
import { StorageBrowserElements } from './context/elements';
import { Components, ComponentsProvider } from './ComponentsProvider';
import { ErrorBoundary } from './ErrorBoundary';

import {
  createConfigurationProvider,
  RegisterAuthListener,
  StoreProvider,
  StoreProviderProps,
} from './providers';
import { StorageBrowserDefault } from './StorageBrowserDefault';
import { assertRegisterAuthListener } from './validators';
import {
  Views,
  LocationActionView,
  LocationDetailView,
  LocationsView,
  ViewsProvider,
} from './views';
import { GetLocationCredentials } from './credentials/types';
import { defaultActionConfigs } from './actions';
import { createUseView } from './views/createUseView';
import { DisplayTextProvider } from './displayText';
import { ListLocations } from './adapters/types';

export interface Config {
  accountId?: string;
  customEndpoint?: string;
  getLocationCredentials: GetLocationCredentials;
  listLocations: ListLocations;
  registerAuthListener: RegisterAuthListener;
  region: string;
}

export interface CreateStorageBrowserInput {
  actions?: LocationActions;
  config: Config;
  components?: Components;
  elements?: Partial<StorageBrowserElements>;
}

export interface StorageBrowserProps<T = string> {
  views?: Views<T>;
}

export interface StorageBrowserComponent<T = string, K = {}> extends Views<T> {
  (
    props: StorageBrowserProps & Exclude<K, keyof StorageBrowserProps>
  ): React.JSX.Element;
  displayName: string;
  Provider: (props: StoreProviderProps) => React.JSX.Element;
}

export interface ResolvedStorageBrowserElements<
  T extends Partial<StorageBrowserElements>,
> extends MergeBaseElements<StorageBrowserElements, T> {}

export type ActionViewName<T = string> = Exclude<
  T,
  'listLocationItems' | 'listLocations'
>;

export function createStorageBrowser(input: CreateStorageBrowserInput): {
  StorageBrowser: StorageBrowserComponent<
    keyof Omit<
      typeof defaultActionConfigs,
      'listLocationItems' | 'listLocations'
    >
  >;
  useView: ReturnType<typeof createUseView<typeof defaultActionConfigs>>;
} {
  assertRegisterAuthListener(input.config.registerAuthListener);

  const {
    accountId,
    customEndpoint,
    registerAuthListener,
    getLocationCredentials,
    region,
  } = input.config;

  // will be replaced, contains the v0 actions API approach
  const TempActionsProvider = createTempActionsProvider({
    ...input,
    actions: locationActionsDefault,
  });

  const ConfigurationProvider = createConfigurationProvider({
    accountId,
    actions: defaultActionConfigs,
    customEndpoint,
    displayName: 'ConfigurationProvider',
    getLocationCredentials,
    region,
    registerAuthListener,
  });

  const composables = { ...DEFAULT_COMPOSABLES, ...input.components };

  /**
   * Provides state, configuration and action values that are shared between
   * the primary View components
   */
  function Provider({ children, ...props }: StoreProviderProps) {
    return (
      <StoreProvider {...props}>
        <ConfigurationProvider>
          <TempActionsProvider>
            <DisplayTextProvider>
              <ComponentsProvider
                composables={composables}
                elements={input.elements}
              >
                {children}
              </ComponentsProvider>
            </DisplayTextProvider>
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

  const useView = createUseView(defaultActionConfigs);

  return { StorageBrowser, useView };
}
