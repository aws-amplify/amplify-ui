import type { LocationPermissions } from '../../actions';
import type {
  AWSTemporaryCredentials,
  LocationCredentialsProvider,
  LocationCredentials,
} from '../../storage-internal';

export interface CredentialsLocation {
  scope: string;
  permissions: LocationPermissions;
}

export interface CreateLocationCredentialsStoreInput {
  handler: GetLocationCredentials;
}

export interface LocationCredentialsStore {
  /**
   * Get location-specific credentials. It uses a cache internally to optimize performance when
   * getting credentials for the same location. It will refresh credentials if they expire or
   * when forced to.
   */
  getProvider(option: CredentialsLocation): LocationCredentialsProvider;
  /**
   * Invalidate cached credentials and force subsequent calls to get location-specific
   * credentials to throw. It also makes subsequent calls to `getCredentialsProviderForLocation`
   * to throw.
   */
  destroy(): void;
}

export type GetLocationCredentialsInput = CredentialsLocation;
export type GetLocationCredentialsOutput = LocationCredentials;

export type GetLocationCredentials = (
  input: GetLocationCredentialsInput
) => Promise<GetLocationCredentialsOutput>;

export interface CredentialsStoreValue extends CredentialsLocation {
  credentials?: AWSTemporaryCredentials;
  inflightCredentials?: Promise<{ credentials: AWSTemporaryCredentials }>;
}

// resolves to `${S3Uri}_${SerializedPermissions}`
export type CacheKey = `${string}_${string}`;

/**
 * LRU implementation for Location Credentials Store
 * O(n) for get and set for simplicity.
 *
 * @internal
 */
export interface LruLocationCredentialsStore {
  capacity: number;
  refreshHandler: GetLocationCredentials;
  values: Map<CacheKey, CredentialsStoreValue>;
}
