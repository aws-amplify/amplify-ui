import React from 'react';

import { ListLocations } from './actions';
import { DEFAULT_COMPOSABLES } from './composables';
import { StorageBrowserElements, elementsDefault } from './context/elements';
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
import { StorageBrowserDisplayText } from './displayText/types';

export interface Config {
  accountId?: string;
  customEndpoint?: string;
  getLocationCredentials: GetLocationCredentials;
  listLocations: ListLocations;
  registerAuthListener: RegisterAuthListener;
  region: string;
}

export interface CreateStorageBrowserInput {
  // to be updated
  actions?: never;
  config: Config;
  components?: Components;
  elements?: Partial<StorageBrowserElements>;
}

export interface StorageBrowserProps<T = string> {
  views?: Views<T>;
  displayText?: StorageBrowserDisplayText;
}

export interface StorageBrowserComponent<T = string, K = {}> extends Views<T> {
  (
    props: StorageBrowserProps & Exclude<K, keyof StorageBrowserProps>
  ): React.JSX.Element;
  displayName: string;
  Provider: (props: StorageBrowserProviderProps) => React.JSX.Element;
}

export type ActionViewName<T = string> = Exclude<
  T,
  'listLocationItems' | 'listLocations'
>;

export interface StorageBrowserProviderProps extends StoreProviderProps {
  displayText?: StorageBrowserDisplayText;
}

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

  const ConfigurationProvider = createConfigurationProvider({
    accountId,
    actions: {
      ...defaultActionConfigs,
      // @ts-expect-error To be addressed with line 40
      listLocations: {
        componentName: 'LocationsView',
        handler: input.config.listLocations,
      },
    },
    customEndpoint,
    displayName: 'ConfigurationProvider',
    getLocationCredentials,
    region,
    registerAuthListener,
  });

  const composables = { ...DEFAULT_COMPOSABLES, ...input.components };
  const elements = { ...elementsDefault, ...input.elements };

  /**
   * Provides state, configuration and action values that are shared between
   * the primary View components
   */
  function Provider({ children, ...props }: StorageBrowserProviderProps) {
    return (
      <StoreProvider {...props}>
        <ConfigurationProvider>
          <DisplayTextProvider displayText={props.displayText}>
            <ComponentsProvider composables={composables} elements={elements}>
              {children}
            </ComponentsProvider>
          </DisplayTextProvider>
        </ConfigurationProvider>
      </StoreProvider>
    );
  }

  const StorageBrowser: StorageBrowserComponent = ({ views, displayText }) => (
    <ErrorBoundary>
      <Provider displayText={displayText}>
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
