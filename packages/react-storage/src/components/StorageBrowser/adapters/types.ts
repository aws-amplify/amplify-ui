import { RegisterAuthListener } from '../providers';
import { GetLocationCredentials } from '../credentials/types';
import { CredentialsProvider, ListLocations } from '../storage-internal';

export interface CreateManagedAuthAdapterInput {
  accountId: string;
  region: string;
  credentialsProvider: CredentialsProvider;
  registerAuthListener: RegisterAuthListener;
}

export interface StorageBrowserAuthAdapter {
  listLocations: ListLocations;
  getLocationCredentials: GetLocationCredentials;
  region: string;
  registerAuthListener: RegisterAuthListener;
}
