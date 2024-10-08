import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import { AuthSession, fetchAuthSession } from 'aws-amplify/auth';
import { isFunction } from '@aws-amplify/ui';

import { LocationAccess } from '../context/types';
import { LocationCredentialsProvider } from '../storage-internal';
import { StorageBrowserAuthAdapter } from './types';

export const MISSING_BUCKET_OR_REGION_ERROR =
  'Amplify Storage configuration not found. Did you run `Amplify.configure` from your project root?';

interface AWSCredentials extends NonNullable<AuthSession['credentials']> {}
interface AWSTemporaryCredentials
  extends NonNullable<
    Awaited<ReturnType<LocationCredentialsProvider>>['credentials']
  > {}
export interface CreateAmplifyAuthAdapterOptions {
  defaultPrefixes: (string | ((identityId: string) => string))[];
}

const isTemporaryCredentials = (
  value?: AWSCredentials | AWSTemporaryCredentials
): value is AWSTemporaryCredentials =>
  !!value?.sessionToken || !!value?.expiration;

export const createAmplifyAuthAdapter = (input?: {
  options?: CreateAmplifyAuthAdapterOptions;
}): StorageBrowserAuthAdapter => {
  const { bucket, region } = Amplify.getConfig()?.Storage?.S3 ?? {};
  if (!bucket || !region) {
    throw new Error(MISSING_BUCKET_OR_REGION_ERROR);
  }

  async function getLocationCredentials(): Promise<{
    credentials: AWSTemporaryCredentials;
    identityId: string;
  }> {
    const { credentials, identityId } = await fetchAuthSession();
    if (!isTemporaryCredentials(credentials)) {
      throw new Error('Temporary Auth credentials not found.');
    }
    if (!identityId) {
      throw new Error('Identity ID not found.');
    }
    return { credentials, identityId };
  }

  async function listLocations(
    ..._input: Parameters<StorageBrowserAuthAdapter['listLocations']>
  ): ReturnType<StorageBrowserAuthAdapter['listLocations']> {
    const { options } = input ?? {};
    const { defaultPrefixes = [] } = options ?? {};

    const { identityId } = await getLocationCredentials();

    const locations: LocationAccess[] = defaultPrefixes.map((prefix) => {
      const isPrefix = !!prefix;
      const isCallback = isPrefix && isFunction(prefix);

      return {
        type: isPrefix ? 'PREFIX' : 'BUCKET',
        permission: 'READWRITE',
        scope: `s3://${bucket}/${
          isPrefix ? (isCallback ? prefix(identityId) : prefix) : undefined
        }*`,
      };
    });

    return { locations, nextToken: undefined };
  }

  return {
    getLocationCredentials,
    listLocations,
    region,
    registerAuthListener: (onStateChange) => {
      const remove = Hub.listen('auth', (data) => {
        if (data.payload.event === 'signedOut') {
          onStateChange();
          remove();
        }
      });
    },
  };
};
