import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Amplify } from 'aws-amplify';
import * as CreateStorageBrowserModule from '../createStorageBrowser';
import * as CreateAmplifyAuthAdapter from '../adapters/createAmplifyAuthAdapter';
import { StorageBrowser } from '../StorageBrowserAmplify';

const createStorageBrowserSpy = jest.spyOn(
  CreateStorageBrowserModule,
  'createStorageBrowser'
);

jest.spyOn(Amplify, 'getConfig').mockReturnValue({
  Storage: {
    S3: {
      bucket: 'XXXXXX',
      region: 'region',
    },
  },
});

const createAmplifyAuthAdapterSpy = jest.spyOn(
  CreateAmplifyAuthAdapter,
  'createAmplifyAuthAdapter'
);

const defaultPrefixes = [
  'public/',
  (identityId: string) => `protected/${identityId}/`,
  (identityId: string) => `private/${identityId}/`,
];

describe('StorageBrowser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('calls `createStorageBrowser`', async () => {
    await waitFor(() => {
      render(<StorageBrowser defaultPrefixes={defaultPrefixes} />);
    });

    expect(createStorageBrowserSpy).toHaveBeenCalledTimes(1);
    expect(createStorageBrowserSpy).toHaveBeenCalledWith({
      elements: expect.anything(),
      config: expect.anything(),
    });

    expect(createAmplifyAuthAdapterSpy).toHaveBeenCalledTimes(1);
    expect(createAmplifyAuthAdapterSpy).toHaveBeenCalledWith({
      options: { defaultPrefixes },
    });
  });
});
