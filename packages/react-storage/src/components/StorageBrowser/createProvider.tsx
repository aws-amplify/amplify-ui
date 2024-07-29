import React from 'react';

import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';

import { ActionProvider } from './context/actions';

import { Permission } from './context/actions/types';
import { LocationsDataProvider } from './context/locationsData';
import { StorageBrowserElements } from './context/elements';
import { ControlProvider } from './context/controls';
import { ErrorBoundary } from './ErrorBoundary';
import { ConfigContext, Config } from './context/config';

export interface CreateProviderInput<T, K> {
  config: Config<K>;
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
  return function Provider({
    children,
  }: {
    children?: React.ReactNode;
  }): React.JSX.Element {
    return (
      <ErrorBoundary>
        <ElementsProvider elements={elements}>
          <ConfigContext.Provider value={config}>
            <LocationsDataProvider>
              <ActionProvider>
                <ControlProvider>{children}</ControlProvider>
              </ActionProvider>
            </LocationsDataProvider>
          </ConfigContext.Provider>
        </ElementsProvider>
      </ErrorBoundary>
    );
  };
}
