import React from 'react';

import { ActionTypeProvider, ActionTypeProviderProps } from './actionType';
import { LocationProvider, LocationProviderProps } from './location';

export interface StoreProviderProps
  extends ActionTypeProviderProps,
    LocationProviderProps {}

export function StoreProvider(props: StoreProviderProps): React.JSX.Element {
  const { actionType, children, location, path } = props;

  return (
    <LocationProvider location={location} path={path}>
      <ActionTypeProvider actionType={actionType}>
        {children}
      </ActionTypeProvider>
    </LocationProvider>
  );
}
