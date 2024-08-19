import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { ActionProvider, createListLocationsAction } from './context/actions';

import { Permission } from './context/types';
import {
  LocationConfigProvider,
  LocationConfigProviderProps,
} from './context/config';
import { ControlProvider } from './context/controls';
import { StorageBrowserElements } from './context/elements';
import { Controller } from './Controller';
import { ErrorBoundary } from './ErrorBoundary';
import { ListLocations } from '@aws-amplify/storage/storage-browser';

export interface Config
  extends Pick<
    LocationConfigProviderProps,
    'getLocationCredentials' | 'region' | 'registerAuthListener'
  > {
  listLocations: ListLocations;
}

export interface CreateProviderInput<T, _K> {
  config: Config;
  elements?: T;
}

export default function createProvider<
  T extends Partial<StorageBrowserElements>,
  K extends Permission,
>({
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
          <ControlProvider>
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
