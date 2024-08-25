import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ActionsModule from '../context/actions';
import * as ControlsModule from '../context/controls';

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

const INITIAL_PAGINATE_STATE = [
  {
    hasNext: false,
    hasPrevious: false,
    isLoadingNextPage: false,
    current: 0,
  },
  jest.fn(),
];
const INITIAL_NAVIGATE_STATE = [
  { location: undefined, history: [], path: '' },
  jest.fn(),
];
const INITIAL_ACTION_STATE = [
  { selected: { type: undefined, items: undefined }, actions: {} },
  jest.fn(),
];

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);
const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
  registerAuthListener: jest.fn(),
};

const input = { actions: {}, config };

describe('createStorageBrowser', () => {
  beforeEach(() => {
    useControlSpy.mockClear();
  });

  it('throws when registerAuthListener is not a function', () => {
    const input = {
      config: {
        getLocationCredentials: jest.fn(),
        listLocations,
        region: 'region',
      },
    };

    // @ts-expect-error intentionally omit registerAuthListener
    expect(() => createStorageBrowser(input)).toThrow(
      'StorageManager: `registerAuthListener` must be a function.'
    );
  });

  it('renders the `LocationsView` by default', async () => {
    useControlSpy.mockImplementation(
      ({ type }) =>
        ({
          ACTION_SELECT: INITIAL_ACTION_STATE,
          NAVIGATE: INITIAL_NAVIGATE_STATE,
          PAGINATE: INITIAL_PAGINATE_STATE,
        })[type]
    );
    const { StorageBrowser } = createStorageBrowser(input);

    await waitFor(() => {
      render(<StorageBrowser />);
    });

    expect(screen.getByTestId('LOCATIONS_VIEW')).toBeInTheDocument();
  });

  it('renders the `LocationDetailView` when a location is selected', async () => {
    useControlSpy.mockImplementation(
      ({ type }) =>
        ({
          ACTION_SELECT: INITIAL_ACTION_STATE,
          NAVIGATE: [
            {
              location: {
                scope: 's3://test-bucket/*',
                permission: 'READWRITE',
                type: 'BUCKET',
              },
              history: [{ prefix: '', position: 0 }],
            },
          ],
          PAGINATE: INITIAL_PAGINATE_STATE,
        })[type]
    );

    const { StorageBrowser } = createStorageBrowser(input);

    await waitFor(() => {
      render(<StorageBrowser />);
    });

    expect(screen.getByTestId('LOCATION_DETAIL_VIEW')).toBeInTheDocument();
  });

  it('renders the `LocationActionView` when an action is selected', async () => {
    useControlSpy.mockImplementation(
      ({ type }) =>
        ({
          ACTION_SELECT: [
            {
              actions: { CREATE_FOLDER: {} },
              selected: { type: 'CREATE_FOLDER', items: undefined },
            },
            jest.fn(),
          ],
          NAVIGATE: [
            {
              location: {
                scope: 's3://test-bucket/*',
                permission: 'READWRITE',
                type: 'BUCKET',
              },
              history: [{ prefix: '', position: 0 }],
            },
          ],
          PAGINATE: INITIAL_PAGINATE_STATE,
        })[type]
    );

    const { StorageBrowser } = createStorageBrowser(input);

    render(<StorageBrowser />);

    await waitFor(() => {
      expect(screen.getByTestId('LOCATION_ACTION_VIEW')).toBeInTheDocument();
    });
  });
});
