import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ActionsModule from '../context/actions';
import * as ControlsModule from '../context/control';

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

const INITIAL_NAVIGATE_STATE = [
  { location: undefined, history: [], path: undefined },
  jest.fn(),
];
const INITIAL_ACTION_STATE = [
  { selected: { type: undefined, items: undefined }, actions: {} },
  jest.fn(),
];

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');

const getLocationCredentials = jest.fn();
const listLocations = jest.fn();
const region = 'region';

const config = {
  getLocationCredentials,
  listLocations,
  region,
  registerAuthListener: jest.fn(),
};

const input = { config };

describe('createStorageBrowser', () => {
  beforeEach(() => {
    useControlSpy.mockClear();
  });

  it('throws when registerAuthListener is not a function', () => {
    const input = {
      config: { getLocationCredentials, listLocations, region },
    };

    // @ts-expect-error intentionally omit registerAuthListener
    expect(() => createStorageBrowser(input)).toThrow(
      'StorageManager: `registerAuthListener` must be a function.'
    );
  });

  it('renders the `LocationsView` by default', async () => {
    useControlSpy.mockImplementation(
      (type) =>
        ({
          LOCATION_ACTIONS: INITIAL_ACTION_STATE,
          NAVIGATE: INITIAL_NAVIGATE_STATE,
        })[type]
    );
    const { StorageBrowser } = createStorageBrowser(input);

    await waitFor(() => {
      render(<StorageBrowser />);
    });

    expect(screen.getByTestId('LOCATIONS_VIEW')).toBeInTheDocument();
  });
});
