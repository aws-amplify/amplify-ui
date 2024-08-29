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
import { Controller } from './Controller';

export interface Config
  extends Pick<
    LocationConfigProviderProps,
    'getLocationCredentials' | 'region' | 'registerAuthListener'
  > {
  listLocations: ListLocations;
}

export interface CreateProviderInput<T, K> {
  actions: K;
  config: Config;
  elements?: T;
}

export default function createProvider<
  T extends Partial<StorageBrowserElements>,
  K extends LocationActions,
>({
  actions,
  config,
  elements,
}: CreateProviderInput<T, K>): (props: {
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
                <Controller />
                {children}
              </ActionProvider>
            </LocationConfigProvider>
          </ControlProvider>
        </ElementsProvider>
      </ErrorBoundary>
    );
  };
}
