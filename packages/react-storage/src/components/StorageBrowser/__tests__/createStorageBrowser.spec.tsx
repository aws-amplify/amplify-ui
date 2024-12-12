import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ProvidersModule from '../providers';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as UserAgentModule from '@aws-amplify/core/internals/utils';

import { createStorageBrowser } from '../createStorageBrowser';
import { StorageBrowserDisplayText } from '../displayText/types';

const createConfigurationProviderSpy = jest.spyOn(
  ProvidersModule,
  'createConfigurationProvider'
);

const setCustomUserAgentSpy = jest.spyOn(UserAgentModule, 'setCustomUserAgent');

const accountId = '012345678901';
const customEndpoint = 'mock-endpoint';
const getLocationCredentials = jest.fn();
const listLocations = jest.fn();
const region = 'region';

const config = {
  accountId,
  customEndpoint,
  getLocationCredentials,
  listLocations,
  region,
  registerAuthListener: jest.fn(),
};

const input = { config };

describe('createStorageBrowser', () => {
  it('throws when registerAuthListener is not a function', () => {
    const input = {
      config: { getLocationCredentials, listLocations, region },
    };

    // @ts-expect-error intentionally omit registerAuthListener
    expect(() => createStorageBrowser(input)).toThrow(
      'StorageBrowser: `registerAuthListener` must be a function.'
    );
  });

  it('renders the `LocationsView` by default', async () => {
    const { StorageBrowser } = createStorageBrowser(input);

    await waitFor(() => {
      render(<StorageBrowser />);
    });

    expect(screen.getByTestId('LOCATIONS_VIEW')).toBeInTheDocument();

    expect(createConfigurationProviderSpy).toHaveBeenCalledWith({
      accountId: config.accountId,
      displayName: 'ConfigurationProvider',
      customEndpoint: config.customEndpoint,
      getLocationCredentials: config.getLocationCredentials,
      region: config.region,
      registerAuthListener: config.registerAuthListener,
    });
  });

  it('support passing custom displayText', async () => {
    const { StorageBrowser } = createStorageBrowser(input);
    const displayText: StorageBrowserDisplayText = {
      LocationsView: { title: 'Hello' },
    };
    await waitFor(() => {
      render(<StorageBrowser displayText={displayText} />);
    });

    const Title = screen.getByText('Hello');
    expect(Title).toBeInTheDocument();
  });

  it('sets a custom user agent', async () => {
    const { StorageBrowser } = createStorageBrowser(input);

    await waitFor(() => {
      render(<StorageBrowser />);
    });

    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      additionalDetails: [
        ['StorageBrowser'],
        ['ui-react-storage', expect.any(String)],
      ],
      apis: ['1', '4', '7', '3', '5'],
      category: 'storage',
    });
  });
});
