import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ActionsModule from '../do-not-import-from-here/actions';
import * as ProvidersModule from '../providers';

import { createStorageBrowser } from '../createStorageBrowser';
import { StorageBrowserDisplayText } from '../displayText/types';

const createConfigurationProviderSpy = jest.spyOn(
  ProvidersModule,
  'createConfigurationProvider'
);

jest.spyOn(ActionsModule, 'useLocationsData').mockReturnValue([
  {
    isLoading: false,
    data: { result: [], nextToken: undefined },
    hasError: false,
    message: undefined,
  },
  jest.fn(),
]);

jest.spyOn(ActionsModule, 'useAction').mockReturnValue([
  {
    data: { result: [], nextToken: undefined },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  jest.fn(),
]);

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
      actions: {
        createFolder: expect.any(Object),
        delete: expect.any(Object),
        listLocationItems: expect.any(Object),
        listLocations: expect.any(Object),
        upload: expect.any(Object),
      },
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
});
