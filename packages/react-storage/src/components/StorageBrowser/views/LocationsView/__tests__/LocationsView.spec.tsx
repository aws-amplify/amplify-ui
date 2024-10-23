import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import createProvider from '../../../createProvider';
import * as ActionsModule from '../../../context/actions';
import * as ControlsModule from '../../../context/control';
import { DEFAULT_ERROR_MESSAGE, LocationsView } from '../LocationsView';
import { DEFAULT_LIST_OPTIONS } from '../useLocationsView';
import { LocationAccess } from '../../../context/types';

const navigateSpy = jest.fn();
const INITIAL_NAVIGATE_STATE = [
  { location: undefined, history: [], path: '' },
  navigateSpy,
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

const generateMockItems = (size: number, page: number): LocationAccess[] => {
  return Array(size)
    .fill(null)
    .map((_, index) => {
      index = index + size * (page - 1);
      const type = page % 2 == 0 ? 'BUCKET' : 'PREFIX';
      return {
        permission: 'READWRITE',
        scope: `s3://test-item-${index}/*`,
        type,
      };
    });
};

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

const EXPECTED_PAGE_SIZE = DEFAULT_LIST_OPTIONS.pageSize;
const results: LocationAccess[] = generateMockItems(EXPECTED_PAGE_SIZE, 1);

const resolvedState: ActionsModule.LocationsDataState = [
  {
    data: {
      result: results,
      nextToken: 'some-token',
    },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];

const nextPageResults = generateMockItems(EXPECTED_PAGE_SIZE, 2);

const nextPageState: ActionsModule.LocationsDataState = [
  {
    data: {
      result: [...results, ...nextPageResults],
      nextToken: undefined,
    },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];

describe('LocationsListView', () => {
  beforeAll(() => {
    useControlSpy.mockImplementation(
      (type) =>
        ({
          LOCATION_ACTIONS: INITIAL_ACTION_STATE,
          NAVIGATE: INITIAL_NAVIGATE_STATE,
        })[type]
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
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

    expect(table).toBeInTheDocument();
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

  it('refreshes table when refresh button is clicked', async () => {
    useLocationsDataSpy.mockReturnValue(resolvedState);

    render(
      <Provider>
        <LocationsView />
      </Provider>
    );

    const refreshButton = screen.getByLabelText('Refresh table');
    expect(refreshButton).toBeEnabled();

    await act(async () => {
      await userEvent.click(refreshButton);
    });

    expect(handleListLocations).toHaveBeenCalledWith({
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
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
      options: {
        exclude: 'WRITE',
        pageSize: EXPECTED_PAGE_SIZE,
        refresh: true,
      },
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
      options: {
        exclude: 'WRITE',
        pageSize: EXPECTED_PAGE_SIZE,
        refresh: true,
      },
    });
  });

  it('can paginate forward and back', async () => {
    useLocationsDataSpy.mockReturnValue(resolvedState);
    render(
      <Provider>
        <LocationsView />
      </Provider>
    );

    // table renders
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // pagination enabled
    const nextPage = await screen.findByLabelText('Go to next page');
    expect(nextPage).not.toBeDisabled();

    // first page data matches input
    expect(screen.queryByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.queryByText('test-item-0')).toBeInTheDocument();
    expect(screen.queryByText('test-item-101')).not.toBeInTheDocument();

    useLocationsDataSpy.mockReturnValue(nextPageState);

    // go forward
    await act(async () => {
      await userEvent.click(nextPage);
    });

    // second page data matches input
    expect(screen.queryByLabelText('Page 2')).toBeInTheDocument();
    expect(screen.queryByText('test-item-0')).not.toBeInTheDocument();
    expect(screen.queryByText('test-item-101')).toBeInTheDocument();

    // pagination enabled
    const previousPage = await screen.findByLabelText('Go to previous page');
    expect(previousPage).not.toBeDisabled();

    // go back
    await act(async () => {
      await userEvent.click(previousPage);
    });

    // first page data matches input
    expect(screen.queryByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.queryByText('test-item-0')).toBeInTheDocument();
    expect(screen.queryByText('test-item-101')).not.toBeInTheDocument();
  });

  it('should navigate to detail page when folder is clicked', async () => {
    useLocationsDataSpy.mockReturnValue(resolvedState);
    render(
      <Provider>
        <LocationsView />
      </Provider>
    );

    const scopeButton = await screen.findByText('test-item-0/');
    await userEvent.click(scopeButton);

    expect(navigateSpy).toHaveBeenCalledWith({
      location: {
        permission: 'READWRITE',
        scope: 's3://test-item-0/*',
        type: 'PREFIX',
      },
      type: 'ACCESS_LOCATION',
    });
  });
});
