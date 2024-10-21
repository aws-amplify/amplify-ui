import React from 'react';

import { LocationData } from './types';

import { useControl } from './control';
import {
  RegisterAuthListener,
  useGetCredentialsProvider,
} from './useGetCredentialsProvider';
import { LocationConfig } from './types';
import { parseLocationAccess } from './navigate/utils';
import { GetLocationCredentials } from '../credentials/types';

export interface LocationConfigProviderProps {
  accountId?: string;
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
  accountId,
  children,
  getLocationCredentials,
  registerAuthListener,
  region,
}: LocationConfigProviderProps): React.JSX.Element {
  const [{ location, path }] = useControl('NAVIGATE');

  const { permission, scope: locationScope } = location ?? {};
  const { bucket } = location
    ? parseLocationAccess(location)
    : ({} as LocationData);

  const scope = !path
    ? locationScope
    : `${locationScope?.slice(0, -1)}${path}*`;

  const getCredentialsProvider = useGetCredentialsProvider(
    getLocationCredentials,
    registerAuthListener
  );

  const value: () => LocationConfig = React.useCallback(() => {
    if (!permission || !scope) {
      throw new Error('Failed to retrieve location config.');
    }

    const credentialsProvider = getCredentialsProvider({ permission, scope });
    return { accountId, bucket, credentialsProvider, region };
  }, [bucket, getCredentialsProvider, permission, region, scope, accountId]);

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
