import { RegisterAuthListener } from '../providers';
import { GetLocationCredentials } from '../credentials/types';
import { CredentialsProvider, ListLocations } from '../storage-internal';

export interface CreateManagedAuthAdapterInput {
  accountId: string;
  region: string;
  credentialsProvider: CredentialsProvider;
  registerAuthListener: RegisterAuthListener;
  customEndpoint?: {
    data?: string;
    control?: string;
  };
}

export interface StorageBrowserAuthAdapter {
  accountId?: string;
  customEndpoint?: string;
  listLocations: ListLocations;
  getLocationCredentials: GetLocationCredentials;
  region: string;
  registerAuthListener: RegisterAuthListener;
}
