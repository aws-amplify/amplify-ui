import React from 'react';

import {
  LocationCredentialsProvider,
  Permission,
} from '../../../storage-internal';
import {
  CreateLocationCredentialsStoreInput,
  GetLocationCredentials,
  LocationCredentialsStore,
  LocationPermissions
} from '../../../credentials/types';

export type RegisterAuthListener = (onStateChange: () => void) => void;

export type GetCredentials = (input: {
  scope: string;
  permissions: LocationPermissions;
}) => LocationCredentialsProvider;

export interface CredentialsStore
  extends Omit<LocationCredentialsStore, 'getProvider'> {
  getCredentials: GetCredentials;
}

export interface CreateCredentialsStoreInput
  extends CreateLocationCredentialsStoreInput {}

export interface CredentialsProviderProps {
  children?: React.ReactNode;
  getLocationCredentials: GetLocationCredentials;
  onDestroy?: () => void;
  registerAuthListener: RegisterAuthListener;
}
