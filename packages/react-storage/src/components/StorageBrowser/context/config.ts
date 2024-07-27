import React from 'react';

import { ListLocations } from './actions/listLocationsAction';
import { Permission } from './actions/types';

export interface Config<T = Permission> {
  listLocations: ListLocations<T>;
}

export const USE_CONFIG_ERROR_MESSAGE = 'Add me later';
export const ConfigContext = React.createContext<Config | undefined>(undefined);

export const useConfig = (): Config => {
  const context = React.useContext(ConfigContext);
  if (!context) {
    throw new Error(USE_CONFIG_ERROR_MESSAGE);
  }
  return context;
};
