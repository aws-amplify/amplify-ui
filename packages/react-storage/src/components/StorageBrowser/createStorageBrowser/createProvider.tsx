import React from 'react';

import {
  ActionConfigsProvider,
  defaultActionConfigs,
  getActionConfigs,
} from '../actions';
import {
  componentsDefault,
  ComponentsProvider,
  DEFAULT_COMPOSABLES,
} from '../components';
import { createConfigurationProvider } from '../configuration';
import { DisplayTextProvider } from '../displayText';
import { defaultValidateFile, FileItemsProvider } from '../fileItems';
import { LocationItemsProvider } from '../locationItems';
import { StoreProvider } from '../store';
import { ActionHandlersProvider, getActionHandlers } from '../useAction';
import { ViewsProvider } from '../views';

import type {
  CreateStorageBrowserInput,
  StorageBrowserProviderProps,
} from './types';
import { FilePreviewProvider } from '../filePreview/context';

export default function createProvider({
  actions,
  components,
  config,
  options,
  filePreview,
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

  const { validateFile = defaultValidateFile } = options ?? {};

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
          <FilePreviewProvider filePreview={filePreview}>
            <ActionConfigsProvider actionConfigs={actionConfigs}>
              <ActionHandlersProvider handlers={handlers}>
                <DisplayTextProvider displayText={displayText}>
                  <ViewsProvider actions={resolvedActions} views={views}>
                    <ComponentsProvider composables={composables}>
                      <LocationItemsProvider>
                        <FileItemsProvider validateFile={validateFile}>
                          {children}
                        </FileItemsProvider>
                      </LocationItemsProvider>
                    </ComponentsProvider>
                  </ViewsProvider>
                </DisplayTextProvider>
              </ActionHandlersProvider>
            </ActionConfigsProvider>
          </FilePreviewProvider>
        </ConfigurationProvider>
      </StoreProvider>
    );
  }

  return Provider;
}
