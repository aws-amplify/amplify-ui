// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Amplify } from 'aws-amplify';

import { AuthSession, fetchAuthSession } from 'aws-amplify/auth';
import { AWSTemporaryCredentials } from '../../storage-internal';
import { StorageBrowserAuthAdapter } from '../types';
import { createAmplifyListLocationsHandler } from './createAmplifyListLocationsHandler';
import { Hub } from 'aws-amplify/utils';
import { RegisterAuthListener } from '../../providers';

export const MISSING_BUCKET_OR_REGION_ERROR =
  'Amplify Storage configuration not found. Did you run `Amplify.configure` from your project root?';

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
      throw new Error('Temporary Auth credentials not found.');
    }
    if (!identityId) {
      throw new Error('Identity ID not found.');
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
