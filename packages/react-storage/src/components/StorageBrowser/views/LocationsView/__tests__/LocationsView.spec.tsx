import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import createProvider from '../../../createProvider';
import * as ActionsModule from '../../../context/actions';
import * as ControlsModule from '../../../context/control';

import { LocationsView } from '..';
import { DEFAULT_ERROR_MESSAGE } from '../LocationsView';
import { DEFAULT_LIST_OPTIONS } from '../useLocationsView';

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
const Provider = createProvider({ actions: {}, config });

const useLocationsDataSpy = jest.spyOn(ActionsModule, 'useLocationsData');

const handleListLocations = jest.fn();

const initialState: ActionsModule.LocationsDataState = [
  {
    data: { result: [], nextToken: undefined },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];

const loadingState: ActionsModule.LocationsDataState = [
  {
    data: { result: [], nextToken: undefined },
    hasError: false,
    isLoading: true,
    message: undefined,
  },
  handleListLocations,
];

const resolvedState: ActionsModule.LocationsDataState = [
  {
    data: {
      result: [
        {
          permission: 'READWRITE',
          scope: 's3://test-bucket/*',
          type: 'BUCKET',
        },
      ],
      nextToken: undefined,
    },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];

describe('LocationsListView', () => {
  beforeEach(() => {
    useControlSpy.mockImplementation(
      (type) =>
        ({
          LOCATION_ACTIONS: INITIAL_ACTION_STATE,
          NAVIGATE: INITIAL_NAVIGATE_STATE,
        })[type]
    );

    handleListLocations.mockClear();
    useLocationsDataSpy.mockClear();
  });

  it('renders a `LocationsListView`', async () => {
    await waitFor(() => {
      expect(
        render(
          <Provider>
            <LocationsView />
          </Provider>
        ).container
      ).toBeDefined();
    });
  });

  it('renders a returned error message for `LocationsListView`', () => {
    const errorMessage = 'Something went wrong.';

    useLocationsDataSpy.mockReturnValue([
      {
        data: {
          result: [
            {
              permission: 'READWRITE',
              scope: 's3://test-bucket/*',
              type: 'BUCKET',
            },
          ],
          nextToken: 'some-token',
        },
        hasError: true,
        isLoading: false,
        message: errorMessage,
      },
      handleListLocations,
    ]);

    render(
      <Provider>
        <LocationsView />
      </Provider>
    );

    const message = screen.getByRole('alert');
    const messageText = screen.getByText(errorMessage);
    expect(message).toBeInTheDocument();
    expect(messageText).toBeInTheDocument();

    // table doesn't render
    const table = screen.queryByRole('table');
    expect(table).not.toBeInTheDocument();

    // pagination disabled
    const nextPage = screen.getByLabelText('Go to next page');
    expect(nextPage).toBeDisabled();
    const prevPage = screen.getByLabelText('Go to previous page');
    expect(prevPage).toBeDisabled();
  });

  it('renders a fallback error message for `LocationsListView`', () => {
    useLocationsDataSpy.mockReturnValue([
      {
        data: {
          result: [],
          nextToken: undefined,
        },
        hasError: true,
        isLoading: false,
        message: undefined,
      },
      handleListLocations,
    ]);

    render(
      <Provider>
        <LocationsView />
      </Provider>
    );

    const messageText = screen.getByText(DEFAULT_ERROR_MESSAGE);
    expect(messageText).toBeInTheDocument();
  });

  it('renders a Locations View table', () => {
    useLocationsDataSpy.mockReturnValue([
      {
        data: {
          result: [
            {
              permission: 'READWRITE',
              scope: 's3://test-bucket/*',
              type: 'BUCKET',
            },
          ],
          nextToken: undefined,
        },
        hasError: false,
        isLoading: false,
        message: undefined,
      },
      handleListLocations,
    ]);

    render(
      <Provider>
        <LocationsView />
      </Provider>
    );

    const table = screen.getByRole('table');

    expect(table).toBeDefined();
  });

  it.todo('handles failure from locations loading as expected');

  it.todo('handles empty locations result data as expected');

  it('behaves as expected on initial render', () => {
    useLocationsDataSpy
      .mockReturnValueOnce(initialState)
      .mockReturnValueOnce(loadingState)
      .mockReturnValue(resolvedState);

    const { rerender } = render(
      <Provider>
        <LocationsView />
      </Provider>
    );

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledWith({
      options: {
        ...DEFAULT_LIST_OPTIONS,
        refresh: true,
      },
    });

    rerender(
      <Provider>
        <LocationsView />
      </Provider>
    );

    expect(handleListLocations).toHaveBeenCalledTimes(1);

    rerender(
      <Provider>
        <LocationsView />
      </Provider>
    );

    expect(handleListLocations).toHaveBeenCalledTimes(1);
  });

  it('refreshes locations on handleListLocations reference change', () => {
    const updatedHandleListLocations = jest.fn();

    useLocationsDataSpy.mockReturnValue(initialState);

    // initial
    const { rerender } = render(
      <Provider>
        <LocationsView />
      </Provider>
    );

    useLocationsDataSpy.mockReturnValue(loadingState);

    // loading
    rerender(
      <Provider>
        <LocationsView />
      </Provider>
    );

    useLocationsDataSpy.mockReturnValueOnce(resolvedState);

    // resolved
    rerender(
      <Provider>
        <LocationsView />
      </Provider>
    );

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledWith({
      options: { exclude: 'WRITE', pageSize: 100, refresh: true },
    });
    expect(updatedHandleListLocations).not.toHaveBeenCalled();

    useLocationsDataSpy.mockReturnValue([
      { ...resolvedState[0] },
      updatedHandleListLocations,
    ]);

    // reference change
    rerender(
      <Provider>
        <LocationsView />
      </Provider>
    );

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledWith({
      options: { exclude: 'WRITE', pageSize: 100, refresh: true },
    });
  });
});
