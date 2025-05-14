import type { LocationType, ListLocations } from '../actions';
import type {
  GetLocationCredentials,
  CredentialsLocation,
  RegisterAuthListener,
} from '../credentials';
import type { CredentialsProvider } from '../storage-internal';

export interface LocationAccess extends CredentialsLocation {
  /**
   * Parse location type parsed from scope format:
   * * BUCKET: `'s3://<bucket>/*'`
   * * PREFIX: `'s3://<bucket>/<prefix-with-path>*'`
   * * OBJECT: `'s3://<bucket>/<prefix-with-path>/<object>'`
   */
  readonly type: LocationType;
}

export interface CreateManagedAuthAdapterInput {
  accountId: string;
  region: string;
  credentialsProvider: CredentialsProvider;
  registerAuthListener: RegisterAuthListener;
  customEndpoint?: string;
}

export interface StorageBrowserAuthAdapter {
  accountId?: string;
  listLocations: ListLocations;
  getLocationCredentials: GetLocationCredentials;
  region: string;
  registerAuthListener: RegisterAuthListener;
}
