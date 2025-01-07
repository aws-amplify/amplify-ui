import { Amplify } from 'aws-amplify';
import { AuthSession, fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

import { AWSTemporaryCredentials } from '../../storage-internal';
import { StorageBrowserAuthAdapter } from '../types';
import { createAmplifyListLocationsHandler } from './createAmplifyListLocationsHandler';
import { RegisterAuthListener } from '../../providers';

export const MISSING_BUCKET_OR_REGION_ERROR =
  'Amplify Storage configuration not found. Did you run `Amplify.configure` from your project root?';
export const MISSING_IDENTITY_ID_ERROR = '`identityId` not found.';
export const MISSING_TEMPORARY_CREDENTIALS_ERROR =
  'Temporary Auth `credentials` not found.';

interface AWSCredentials extends NonNullable<AuthSession['credentials']> {}

const isTemporaryCredentials = (
  value?: AWSCredentials | AWSTemporaryCredentials
): value is AWSTemporaryCredentials =>
  !!value?.sessionToken || !!value?.expiration;

export const createAmplifyAuthAdapter = (): StorageBrowserAuthAdapter => {
  const { bucket, region } = Amplify.getConfig()?.Storage?.S3 ?? {};
  if (!bucket || !region) {
    throw new Error(MISSING_BUCKET_OR_REGION_ERROR);
  }
  const listLocations = createAmplifyListLocationsHandler();

  const getLocationCredentials = async (): Promise<{
    credentials: AWSTemporaryCredentials;
    identityId: string;
  }> => {
    const { credentials, identityId } = await fetchAuthSession();
    if (!isTemporaryCredentials(credentials)) {
      throw new Error(MISSING_TEMPORARY_CREDENTIALS_ERROR);
    }
    if (!identityId) {
      throw new Error(MISSING_IDENTITY_ID_ERROR);
    }
    return { credentials, identityId };
  };

  const registerAuthListener: RegisterAuthListener = (onStateChange) => {
    const remove = Hub.listen('auth', (data) => {
      if (data.payload.event === 'signedOut') {
        onStateChange();
        remove();
      }
    });
  };

  return {
    getLocationCredentials,
    listLocations,
    registerAuthListener,
    region,
  };
};
