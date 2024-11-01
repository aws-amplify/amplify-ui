import React from 'react';

import { LocationProvider, LocationProviderProps } from './location';
import { FilesProvider, FilesProviderProps } from './files';
import { ActionTypeProvider, ActionTypeProviderProps } from './actionType';
import {
  LocationItemsProvider,
  LocationItemsProviderProps,
} from './locationItems';

export interface StoreProviderProps
  extends ActionTypeProviderProps,
    FilesProviderProps,
    LocationProviderProps,
    LocationItemsProviderProps {}

export function StoreProvider(props: StoreProviderProps): React.JSX.Element {
  const { actionType, children, location, path } = props;

  return (
    <FilesProvider>
      <LocationProvider location={location} path={path}>
        <LocationItemsProvider>
          <ActionTypeProvider actionType={actionType}>
            {children}
          </ActionTypeProvider>
        </LocationItemsProvider>
      </LocationProvider>
    </FilesProvider>
  );
}
