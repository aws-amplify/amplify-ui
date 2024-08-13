import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { ActionProvider, createListLocationsAction } from './context/actions';

import { LocationAccess, Permission } from './context/types';
import {
  LocationConfigProvider,
  LocationConfigProviderProps,
} from './context/config';
import { ControlProvider } from './context/controls';
import { StorageBrowserElements } from './context/elements';
import { Controller } from './Controller';
import { ErrorBoundary } from './ErrorBoundary';
import { ListLocations } from '@aws-amplify/storage/storage-browser';
import { LocationDetailView } from './Views';
import { NavigateAction } from './context/controls/Navigate/Navigate';

export interface Config
  extends Pick<
    LocationConfigProviderProps,
    'getLocationCredentials' | 'region' | 'registerAuthListener'
  > {
  listLocations: ListLocations;
}

interface Views {
  LocationDetailView?: LocationDetailView;
}

interface Controls {
  Navigate?: React.ComponentType<{
    history: string[];
    location: LocationAccess<Permission> | undefined;
    handleUpdateState: (action: NavigateAction) => void;
  }>;
}

export interface CreateProviderInput<T, _K> {
  config: Config;
  elements?: T;
  views?: Views;
  controls?: Controls;
}

export const ViewsContext = React.createContext<Views | undefined>(undefined);

function ViewsProvider<T extends Views>({
  views,
  ...props
}: {
  children?: React.ReactNode;
  views?: T;
}): React.JSX.Element {
  return <ViewsContext.Provider {...props} value={views} />;
}

export const ControlsContext = React.createContext<Controls | undefined>(
  undefined
);

function ControlsProvider<T extends Controls>({
  controls,
  ...props
}: {
  children?: React.ReactNode;
  controls?: T;
}): React.JSX.Element {
  return <ControlsContext.Provider {...props} value={controls} />;
}

export default function createProvider<
  T extends Partial<StorageBrowserElements>,
  K extends Permission,
>({
  config,
  elements,
  views,
  controls,
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
          <ViewsProvider views={views}>
            <ControlsProvider controls={controls}>
              <ControlProvider>
                <LocationConfigProvider {...config}>
                  <ActionProvider listLocationsAction={listLocationsAction}>
                    <Controller />
                    {children}
                  </ActionProvider>
                </LocationConfigProvider>
              </ControlProvider>
            </ControlsProvider>
          </ViewsProvider>
        </ElementsProvider>
      </ErrorBoundary>
    );
  };
}
