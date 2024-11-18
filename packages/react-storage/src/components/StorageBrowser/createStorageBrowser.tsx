import React from 'react';

import { DEFAULT_COMPOSABLES } from './composables';
import { elementsDefault } from './context/elements';
import { ComponentsProvider } from './ComponentsProvider';
import { ErrorBoundary } from './ErrorBoundary';

import { createConfigurationProvider, StoreProvider } from './providers';
import { StorageBrowserDefault } from './StorageBrowserDefault';
import { assertRegisterAuthListener } from './validators';
import {
  CopyView,
  CreateFolderView,
  DeleteView,
  LocationActionView,
  LocationDetailView,
  LocationsView,
  UploadView,
  ViewsProvider,
} from './views';
import { defaultActionConfigs } from './actions';

import { DisplayTextProvider } from './displayText';
import { createUseView } from './views/createUseView';

import {
  CreateStorageBrowserInput,
  StorageBrowserProviderProps,
  StorageBrowserType,
} from './types';

export function createStorageBrowser(input: CreateStorageBrowserInput): {
  StorageBrowser: StorageBrowserType<
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

  const StorageBrowser: StorageBrowserType = ({ views, displayText }) => (
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

  StorageBrowser.CopyView = CopyView;
  StorageBrowser.CreateFolderView = CreateFolderView;
  StorageBrowser.DeleteView = DeleteView;
  StorageBrowser.UploadView = UploadView;

  StorageBrowser.Provider = Provider;

  StorageBrowser.displayName = 'StorageBrowser';

  const useView = createUseView(defaultActionConfigs);

  return { StorageBrowser, useView };
}
