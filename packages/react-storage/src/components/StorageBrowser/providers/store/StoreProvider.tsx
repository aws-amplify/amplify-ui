import React from 'react';

import { HistoryProvider, HistoryProviderProps } from './history';
import { FilesProvider, FilesProviderProps } from './files';
import { ActionTypeProvider, ActionTypeProviderProps } from './actionType';
import {
  LocationItemsProvider,
  LocationItemsProviderProps,
} from './locationItems';

export interface StoreProviderProps
  extends ActionTypeProviderProps,
    FilesProviderProps,
    HistoryProviderProps,
    LocationItemsProviderProps {}

export function StoreProvider({
  actionType,
  children,
  location,
  locationItems,
}: StoreProviderProps): React.JSX.Element {
  return (
    <FilesProvider>
      <HistoryProvider location={location}>
        <LocationItemsProvider locationItems={locationItems}>
          <ActionTypeProvider actionType={actionType}>
            {children}
          </ActionTypeProvider>
        </LocationItemsProvider>
      </HistoryProvider>
    </FilesProvider>
  );
}
