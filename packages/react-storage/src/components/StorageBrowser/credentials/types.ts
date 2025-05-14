import type React from 'react';

import type { LocationPermissions } from '../actions';
import type { LocationCredentialsProvider } from '../storage-internal';

import type {
  CreateLocationCredentialsStoreInput,
  GetLocationCredentials,
  LocationCredentialsStore,
} from './credentialsStore';

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
