import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ActionsModule from '../context/actions';
import * as ControlsModule from '../context/controls';
import * as CreateProviderModule from '../createProvider';

import { createStorageBrowser } from '../createStorageBrowser';

jest.mock('../context/config');

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

jest
  .spyOn(CreateProviderModule, 'default')
  .mockReturnValue(({ children }) => <>{children}</>);

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
          NAVIGATE: [{ location: undefined, history: [] }],
          ACTION_SELECT: [{ selected: undefined }],
          PAGINATE: [
            {
              hasNext: false,
              hasPrevious: false,
              isLoadingNextPage: false,
              current: 0,
            },
            jest.fn(),
          ],
        })[type]
    );
    const { StorageBrowser } = createStorageBrowser({ config });

    render(<StorageBrowser />);

    await waitFor(() => {
      expect(screen.getByTestId('LOCATIONS_VIEW')).toBeInTheDocument();
    });
  });

  it('renders the `LocationDetailView` when a location is selected', async () => {
    useControlSpy.mockImplementation(
      ({ type }) =>
        ({
          NAVIGATE: [
            {
              location: {
                scope: 's3://test-bucket/*',
                permission: 'READWRITE',
                type: 'BUCKET',
              },
              history: [''],
            },
          ],
          ACTION_SELECT: [{ selected: undefined }],
          PAGINATE: [{}],
        })[type]
    );

    const { StorageBrowser } = createStorageBrowser({ config });

    render(<StorageBrowser />);

    await waitFor(() => {
      expect(screen.getByTestId('LOCATION_DETAIL_VIEW')).toBeInTheDocument();
    });
  });

  it('renders the `LocationActionView` when an action is selected', async () => {
    useControlSpy.mockImplementation(
      ({ type }) =>
        ({
          NAVIGATE: [{ location: undefined, history: [] }],
          ACTION_SELECT: [
            {
              selected: { actionType: 'CREATE_FOLDER', name: 'Create Folder' },
            },
            jest.fn(),
          ],
          PAGINATE: [{}],
        })[type]
    );

    const { StorageBrowser } = createStorageBrowser({ config });

    render(<StorageBrowser />);

    await waitFor(() => {
      expect(screen.getByTestId('LOCATION_ACTION_VIEW')).toBeInTheDocument();
    });
  });
});
