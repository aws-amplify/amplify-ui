import React from 'react';

import {
  GetLocationCredentials,
  LocationCredentialsStore,
  CreateLocationCredentialsStoreInput,
  LocationCredentialsProvider,
  Permission,
} from '../../../storage-internal';

export type RegisterAuthListener = (onStateChange: () => void) => void;

export type GetCredentials = (input: {
  bucket: string;
  permission: Permission;
  prefix: string;
}) => LocationCredentialsProvider;

export interface CredentialsStore
  extends Omit<LocationCredentialsStore, 'getProvider'> {
  getCredentials: GetCredentials;
}

export interface CredentialsContextType {
  destroy: CredentialsStore['destroy'] | undefined;
  getCredentials: CredentialsStore['getCredentials'] | undefined;
}

export interface CreateCredentialsStoreInput
  extends CreateLocationCredentialsStoreInput {}

export interface CredentialsProviderProps {
  children?: React.ReactNode;
  getLocationCredentials: GetLocationCredentials;
  onDestroy?: () => void;
  registerAuthListener: RegisterAuthListener;
}
