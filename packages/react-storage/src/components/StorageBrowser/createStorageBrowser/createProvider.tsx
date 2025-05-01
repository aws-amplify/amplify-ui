import React from 'react';

import {
  defaultActionConfigs,
  getActionConfigs,
  ActionConfigsProvider,
} from '../actions';
import {
  ComponentsProvider,
  componentsDefault,
  DEFAULT_COMPOSABLES,
} from '../components';
import { createConfigurationProvider } from '../configuration';
import { DisplayTextProvider } from '../displayText';
import { FilesProvider } from '../files';
import { LocationItemsProvider } from '../locationItems';
import { StoreProvider } from '../store';
import { getActionHandlers, ActionHandlersProvider } from '../useAction';
import { ViewsProvider } from '../views';

import type {
  CreateStorageBrowserInput,
  StorageBrowserProviderProps,
} from './types';

export default function createProvider({
  actions,
  components,
  config,
}: CreateStorageBrowserInput): (
  props: StorageBrowserProviderProps
) => React.JSX.Element {
  const {
    accountId,
    customEndpoint,
    registerAuthListener,
    getLocationCredentials,
    region,
    listLocations,
  } = config;

  const resolvedActions = {
    default: {
      ...defaultActionConfigs,
      ...actions?.default,
      // always last
      listLocations,
    },
    custom: actions?.custom,
  };

  const handlers = getActionHandlers(resolvedActions);

  const actionConfigs = getActionConfigs(resolvedActions);

  const ConfigurationProvider = createConfigurationProvider({
    accountId,
    customEndpoint,
    displayName: 'ConfigurationProvider',
    getLocationCredentials,
    region,
    registerAuthListener,
  });

  const composables = {
    // fallback composables
    ...DEFAULT_COMPOSABLES,
    // default components
    ...componentsDefault,
    // override components
    ...components,
  };

  /**
   * Provides state, configuration and action values that are shared between
   * the primary View components
   */
  function Provider({
    children,
    displayText,
    views,
    ...props
  }: StorageBrowserProviderProps) {
    return (
      <StoreProvider {...props}>
        <ConfigurationProvider>
          <ActionConfigsProvider actionConfigs={actionConfigs}>
            <ActionHandlersProvider handlers={handlers}>
              <DisplayTextProvider displayText={displayText}>
                <ViewsProvider actions={resolvedActions} views={views}>
                  <ComponentsProvider composables={composables}>
                    <LocationItemsProvider>
                      <FilesProvider>{children}</FilesProvider>
                    </LocationItemsProvider>
                  </ComponentsProvider>
                </ViewsProvider>
              </DisplayTextProvider>
            </ActionHandlersProvider>
          </ActionConfigsProvider>
        </ConfigurationProvider>
      </StoreProvider>
    );
  }

  return Provider;
}
