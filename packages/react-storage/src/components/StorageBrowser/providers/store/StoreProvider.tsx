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

export function StoreProvider(props: StoreProviderProps): React.JSX.Element {
  const { actionType, children, location } = props;

  return (
    <FilesProvider>
      <HistoryProvider location={location}>
        <LocationItemsProvider>
          <ActionTypeProvider actionType={actionType}>
            {children}
          </ActionTypeProvider>
        </LocationItemsProvider>
      </HistoryProvider>
    </FilesProvider>
  );
}
