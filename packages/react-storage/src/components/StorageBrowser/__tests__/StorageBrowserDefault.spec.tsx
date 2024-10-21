import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ActionsModule from '../do-not-import-from-here/actions';
import * as ControlsModule from '../context/control';
import { ViewsProvider } from '../views/context';
import { StorageBrowserDefault } from '../StorageBrowserDefault';

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
const INITIAL_LOCATION_ACTIONS_STATE = [
  { selected: { type: undefined, items: undefined }, actions: {} },
  jest.fn(),
];

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');

const WrappedStorageBrowser = () => (
  <ViewsProvider>
    <StorageBrowserDefault />
  </ViewsProvider>
);

describe('StorageBrowserDefault', () => {
  beforeEach(() => {
    useControlSpy.mockClear();
  });

  it('renders the `LocationsView` by default', async () => {
    useControlSpy.mockImplementation(
      (type) =>
        ({
          LOCATION_ACTIONS: INITIAL_LOCATION_ACTIONS_STATE,
          NAVIGATE: INITIAL_NAVIGATE_STATE,
        })[type]
    );

    await waitFor(() => {
      render(<WrappedStorageBrowser />);
    });

    expect(screen.getByTestId('LOCATIONS_VIEW')).toBeInTheDocument();
  });

  it('renders the `LocationDetailView` when a location is selected', async () => {
    useControlSpy.mockImplementation(
      (type) =>
        ({
          LOCATION_ACTIONS: INITIAL_LOCATION_ACTIONS_STATE,
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
        })[type]
    );

    await waitFor(() => {
      render(<WrappedStorageBrowser />);
    });

    expect(screen.getByTestId('LOCATION_DETAIL_VIEW')).toBeInTheDocument();
  });

  it('renders the `LocationActionView` when an action is selected', async () => {
    useControlSpy.mockImplementation(
      (type) =>
        ({
          LOCATION_ACTIONS: [
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
        })[type]
    );

    render(<WrappedStorageBrowser />);

    await waitFor(() => {
      expect(screen.getByTestId('LOCATION_ACTION_VIEW')).toBeInTheDocument();
    });
  });
});
