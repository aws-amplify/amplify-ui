import React from 'react';

import { ListLocations } from '@aws-amplify/storage/storage-browser';
import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { ActionProvider, createListLocationsAction } from './context/actions';

import {
  LocationConfigProvider,
  LocationConfigProviderProps,
} from './context/config';
import { ControlProvider } from './context/controls';
import { StorageBrowserElements } from './context/elements';
import { ErrorBoundary } from './ErrorBoundary';
import { LocationActions } from './context/controls/locationActions';

export interface Config
  extends Pick<
    LocationConfigProviderProps,
    'getLocationCredentials' | 'region' | 'registerAuthListener'
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
}) => React.JSX.Element {
  const listLocationsAction = createListLocationsAction(config.listLocations);

  return function Provider({
    children,
  }: {
    children?: React.ReactNode;
  }): React.JSX.Element {
    return (
      <ErrorBoundary>
        <ElementsProvider elements={elements}>
          <ControlProvider actions={actions}>
            <LocationConfigProvider {...config}>
              <ActionProvider listLocationsAction={listLocationsAction}>
                {children}
              </ActionProvider>
            </LocationConfigProvider>
          </ControlProvider>
        </ElementsProvider>
      </ErrorBoundary>
    );
  };
}
