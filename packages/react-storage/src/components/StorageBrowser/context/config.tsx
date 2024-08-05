import React from 'react';
import { GetLocationCredentials } from '@aws-amplify/storage/storage-browser';

import { LocationData } from './types';

import { useControl } from './controls';
import {
  RegisterAuthListener,
  useGetCredentialsProvider,
} from './useGetCredentialsProvider';
import { LocationConfig } from './types';
import { parseLocationAccess } from './controls/Navigate/utils';

export interface LocationConfigProviderProps {
  children?: React.ReactNode;
  getLocationCredentials: GetLocationCredentials;
  registerAuthListener: RegisterAuthListener;
  region: string;
}

const ERROR_MESSAGE =
  '`useGetLocationConfig` must be called within a `LocationConfigProvider`';
const LocationConfigContext = React.createContext<
  (() => LocationConfig) | undefined
>(undefined);

export function LocationConfigProvider({
  children,
  getLocationCredentials,
  registerAuthListener,
  region,
}: LocationConfigProviderProps): React.JSX.Element {
  const [{ location, history }] = useControl({ type: 'NAVIGATE' });

  const { permission, scope: _scope } = location ?? {};
  const { bucket } = location
    ? parseLocationAccess(location)
    : ({} as LocationData);

  const scope = !history.length
    ? _scope ?? undefined
    : `${_scope?.slice(0, -1)}${history.join(',')}*`;

  const getCredentialsProvider = useGetCredentialsProvider(
    getLocationCredentials,
    registerAuthListener
  );

  const value: () => LocationConfig = React.useCallback(() => {
    if (!permission || !scope) {
      throw new Error('Failed to retrieve location config.');
    }

    const credentialsProvider = getCredentialsProvider({ permission, scope });
    return { bucket, credentialsProvider, region };
  }, [bucket, getCredentialsProvider, permission, region, scope]);

  return (
    <LocationConfigContext.Provider value={value}>
      {children}
    </LocationConfigContext.Provider>
  );
}

export const useGetLocationConfig = (): (() => LocationConfig) => {
  const context = React.useContext(LocationConfigContext);
  if (!context) {
    throw new Error(ERROR_MESSAGE);
  }
  return context;
};
