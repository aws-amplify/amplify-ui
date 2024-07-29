import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { StorageBrowserAuthAdapter } from './types';

export const createAmplifyAuthAdapter = (): StorageBrowserAuthAdapter => {
  const { bucket, region } = Amplify.getConfig()?.Storage?.S3 ?? {};
  if (!bucket || !region) {
    throw new Error(
      'Amplify Storage configuration not found. Did you run `Amplify.configure` at your project root?'
    );
  }

  async function getLocationCredentials() {
    const { credentials } = await fetchAuthSession();
    if (!credentials) {
      throw new Error('Amplify Auth credentials not found.');
    }
    return { credentials };
  }

  async function listLocations() {
    return Promise.resolve({
      locations: [
        { type: 'BUCKET', permission: 'READWRITE', scope: `s3://${bucket}/*` },
      ],
      nextToken: undefined,
    } as { locations: any[]; nextToken: string | undefined });
  }

  return { getLocationCredentials, listLocations, region };
};
