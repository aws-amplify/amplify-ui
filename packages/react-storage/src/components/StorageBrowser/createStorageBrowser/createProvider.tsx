import React from 'react';
import type { FileData } from '../actions';

import { ActionConfigsProvider, getActionConfigs } from '../actions';
import { defaultActionConfigs } from '../actions/configs/defaults';
import {
  componentsDefault,
  ComponentsProvider,
  DEFAULT_COMPOSABLES,
} from '../components';
import { createConfigurationProvider } from '../configuration';
import { DisplayTextProvider } from '../displayText';
import { defaultValidateFile, FileItemsProvider } from '../fileItems';
import { FilePreviewProvider } from '../filePreview';
import { LocationItemsProvider } from '../locationItems/context';
import { StoreProvider } from '../store';
import { ActionHandlersProvider, getActionHandlers } from '../useAction';
import { ViewsProvider } from '../views';

import type {
  CreateStorageBrowserInput,
  StorageBrowserProviderProps,
} from './types';

export default function createProvider<
  TResolver extends ((properties: FileData) => unknown) | undefined,
>({
  actions,
  components,
  config,
  options,
  filePreview = {},
}: CreateStorageBrowserInput<TResolver>): (
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
          <ActionConfigsProvider actionConfigs={actionConfigs}>
            <ActionHandlersProvider handlers={handlers}>
              <DisplayTextProvider displayText={displayText}>
                <ViewsProvider actions={resolvedActions} views={views}>
                  <ComponentsProvider composables={composables}>
                    <LocationItemsProvider>
                      <FileItemsProvider validateFile={validateFile}>
                        <FilePreviewProvider<TResolver>
                          filePreview={filePreview}
                        >
                          {children}
                        </FilePreviewProvider>
                      </FileItemsProvider>
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
