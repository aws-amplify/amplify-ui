import React from 'react';

import { ListLocations } from './actions/listLocationsAction';
import { Permission } from './actions/types';

export interface Config<T = Permission> {
  listLocations: ListLocations<T>;
}

const USE_CONFIG_ERROR_MESSAGE =
  '`useConfig` must be called within a `ConfigContext.Provider';

export const ConfigContext = React.createContext<Config | undefined>(undefined);

export const useConfig = (): Config => {
  const context = React.useContext(ConfigContext);
  if (!context) {
    throw new Error(USE_CONFIG_ERROR_MESSAGE);
  }
  return context;
};
