import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ActionsModule from '../do-not-import-from-here/actions';

import { createStorageBrowser } from '../createStorageBrowser';

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
const getLocationCredentials = jest.fn();
const listLocations = jest.fn();
const region = 'region';

const config = {
  accountId,
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
  });
});
