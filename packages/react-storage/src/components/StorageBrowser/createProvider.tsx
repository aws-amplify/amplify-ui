import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { ActionProvider, createListLocationsAction } from './context/actions';
import {
  LocationConfigProvider,
  LocationConfigProviderProps,
} from './context/config';
import { ControlProvider } from './context/control';
import { StorageBrowserElements } from './context/elements';
import { LocationActions } from './context/locationActions';
import { ErrorBoundary } from './ErrorBoundary';
import { ListLocations } from './storage-internal';
import { ViewsProvider, Views } from './views';

import { ComposablesProvider } from './composables/context';

export interface Config
  extends Pick<
    LocationConfigProviderProps,
    'accountId' | 'getLocationCredentials' | 'region' | 'registerAuthListener'
  > {
  listLocations: ListLocations;
}

export interface CreateProviderInput {
  actions: LocationActions;
  config: Config;
  elements?: Partial<StorageBrowserElements>;
}

export default function createProvider({
  actions,
  config,
  elements,
}: CreateProviderInput): (props: {
  children?: React.ReactNode;
  views?: Views;
}) => React.JSX.Element {
  const listLocationsAction = createListLocationsAction(config.listLocations);

  return function Provider({
    children,
    views,
  }: {
    children?: React.ReactNode;
    views?: Views;
  }): React.JSX.Element {
    return (
      <ErrorBoundary>
        <ElementsProvider elements={elements}>
          <ControlProvider actions={actions}>
            <LocationConfigProvider {...config}>
              <ActionProvider listLocationsAction={listLocationsAction}>
                <ViewsProvider views={views}>
                  <ComposablesProvider>{children}</ComposablesProvider>
                </ViewsProvider>
              </ActionProvider>
            </LocationConfigProvider>
          </ControlProvider>
        </ElementsProvider>
      </ErrorBoundary>
    );
  };
}
