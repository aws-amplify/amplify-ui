import { Amplify } from 'aws-amplify';
import { AuthSession, fetchAuthSession } from 'aws-amplify/auth';
import { LocationCredentialsProvider } from '@aws-amplify/storage/storage-browser';

import { StorageBrowserAuthAdapter } from './types';
import { LocationAccess } from '../context/actions/types';

interface AWSCredentials extends NonNullable<AuthSession['credentials']> {}
interface AWSTemporaryCredentials
  extends NonNullable<
    Awaited<ReturnType<LocationCredentialsProvider>>['credentials']
  > {}

const isTemporaryCredentials = (
  value?: AWSCredentials | AWSTemporaryCredentials
): value is AWSTemporaryCredentials =>
  !!value?.sessionToken || !!value?.expiration;

export const createAmplifyAuthAdapter = (input?: {
  options?: { defaultPrefixes?: string[] };
}): StorageBrowserAuthAdapter => {
  const { bucket, region } = Amplify.getConfig()?.Storage?.S3 ?? {};
  if (!bucket || !region) {
    throw new Error(
      'Amplify Storage configuration not found. Did you run `Amplify.configure` at your project root?'
    );
  }

  async function getLocationCredentials(): Promise<{
    credentials: AWSTemporaryCredentials;
  }> {
    const { credentials } = await fetchAuthSession();
    if (!isTemporaryCredentials(credentials)) {
      throw new Error('Temporary Auth credentials not found.');
    }
    return { credentials };
  }

  async function listLocations(
    ..._input: Parameters<StorageBrowserAuthAdapter['listLocations']>
  ): ReturnType<StorageBrowserAuthAdapter['listLocations']> {
    const { options } = input ?? {};
    const { defaultPrefixes = [] } = options ?? {};

    await getLocationCredentials();

    const locations: LocationAccess[] = defaultPrefixes.map((prefix) => {
      const isPrefix = !!prefix;
      return {
        type: isPrefix ? 'PREFIX' : 'BUCKET',
        permission: 'READWRITE',
        scope: `s3://${bucket}/${isPrefix ? prefix : undefined}*`,
      };
    });

    return { locations, nextToken: undefined };
  }

  return { getLocationCredentials, listLocations, region };
};
