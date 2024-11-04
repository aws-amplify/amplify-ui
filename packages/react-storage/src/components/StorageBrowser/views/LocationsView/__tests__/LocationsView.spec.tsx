import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as AmplifyReactCore from '@aws-amplify/ui-react-core';

import * as StoreModule from '../../../providers/store';
import { DEFAULT_ERROR_MESSAGE, LocationsView } from '../LocationsView';
import * as ConfigModule from '../../../providers/configuration';
import { DEFAULT_LIST_OPTIONS } from '../useLocationsView';
import { ActionInputConfig, LocationData } from '../../../actions';

const dispatchStoreAction = jest.fn();
const testStoreState = {
  location: {
    current: {
      bucket: 'test-bucket',
      prefix: '',
      permission: 'READ' as const,
      id: '2',
      type: 'PREFIX' as const,
    },
    path: '',
    key: '',
  },
  files: [],
  locationItems: {
    fileDataItems: undefined,
  },
  actionType: undefined,
};
jest
  .spyOn(StoreModule, 'useStore')
  .mockReturnValue([testStoreState, dispatchStoreAction]);

const useDataSpy = jest.spyOn(AmplifyReactCore, 'useDataState');
const useGetActionSpy = jest.spyOn(ConfigModule, 'useGetActionInput');

const config: ActionInputConfig = {
  bucket: 'bucky',
  credentials: jest.fn(),
  region: 'us-weast-1',
};
useGetActionSpy.mockReturnValue(() => config);

const generateMockItems = (size: number, page: number): LocationData[] => {
  return Array(size)
    .fill(null)
    .map((_, index) => {
      index = index + size * (page - 1);
      const type = page % 2 == 0 ? 'BUCKET' : 'PREFIX';
      return {
        bucket: 'test-bucket',
        prefix: `item-${index}/`,
        permission: 'READWRITE',
        id: 'identity',
        type,
      };
    });
};

const initialState = {
  data: { items: [], nextToken: undefined },
  hasError: false,
  isLoading: false,
  message: undefined,
};

const loadingState = {
  data: { items: [], nextToken: undefined },
  hasError: false,
  isLoading: true,
  message: undefined,
};

const EXPECTED_PAGE_SIZE = DEFAULT_LIST_OPTIONS.pageSize;
const results: LocationData[] = generateMockItems(EXPECTED_PAGE_SIZE, 1);

const resolvedState = {
  data: {
    items: results,
    nextToken: 'some-token',
  },
  hasError: false,
  isLoading: false,
  message: undefined,
};

const nextPageResults = generateMockItems(EXPECTED_PAGE_SIZE, 2);

const nextPageState = {
  data: {
    items: [...results, ...nextPageResults],
    nextToken: undefined,
  },
  hasError: false,
  isLoading: false,
  message: undefined,
};

describe('LocationsListView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a returned error message for `LocationsListView`', () => {
    const errorMessage = 'Something went wrong.';
    const handleListLocations = jest.fn();
    useDataSpy.mockReturnValue([
      {
        data: { items: results, nextToken: 'some-token' },
        hasError: true,
        isLoading: false,
        message: errorMessage,
      },
      handleListLocations,
    ]);

    render(<LocationsView />);

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
    const handleListLocations = jest.fn();
    useDataSpy.mockReturnValue([
      {
        data: { items: results, nextToken: undefined },
        hasError: true,
        isLoading: false,
        message: undefined,
      },
      handleListLocations,
    ]);

    render(<LocationsView />);

    const messageText = screen.getByText(DEFAULT_ERROR_MESSAGE);
    expect(messageText).toBeInTheDocument();
  });

  it('renders a Locations View table', () => {
    useDataSpy.mockReturnValue([resolvedState, jest.fn()]);

    render(<LocationsView />);

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
  });

  it.todo('handles failure from locations loading as expected');

  it.todo('handles empty locations result data as expected');

  it('behaves as expected on initial render', () => {
    const handleListLocations = jest.fn();

    useDataSpy
      .mockReturnValueOnce([initialState, handleListLocations])
      .mockReturnValueOnce([loadingState, handleListLocations])
      .mockReturnValue([resolvedState, handleListLocations]);

    const { rerender } = render(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledWith({
      config,
      prefix: '',
      options: {
        ...DEFAULT_LIST_OPTIONS,
        refresh: true,
      },
    });

    rerender(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);

    rerender(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
  });

  it('refreshes table when refresh button is clicked', async () => {
    const handleListLocations = jest.fn();
    useDataSpy.mockReturnValue([resolvedState, handleListLocations]);

    render(<LocationsView />);

    const refreshButton = screen.getByLabelText('Refresh data');
    expect(refreshButton).toBeEnabled();

    await act(async () => {
      await userEvent.click(refreshButton);
    });

    expect(handleListLocations).toHaveBeenCalledWith({
      config,
      prefix: '',
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  });

  it('refreshes locations on handleListLocations reference change', () => {
    const handleListLocations = jest.fn();
    const updatedHandleListLocations = jest.fn();

    useDataSpy.mockReturnValue([initialState, handleListLocations]);

    // initial
    const { rerender } = render(<LocationsView />);

    useDataSpy.mockReturnValue([loadingState, handleListLocations]);

    // loading
    rerender(<LocationsView />);

    useDataSpy.mockReturnValueOnce([resolvedState, handleListLocations]);

    // resolved
    rerender(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledWith({
      config,
      prefix: '',
      options: {
        exclude: 'WRITE',
        pageSize: EXPECTED_PAGE_SIZE,
        refresh: true,
      },
    });
    expect(updatedHandleListLocations).not.toHaveBeenCalled();

    useDataSpy.mockReturnValue([
      { ...resolvedState },
      updatedHandleListLocations,
    ]);

    // reference change
    rerender(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledWith({
      config,
      prefix: '',
      options: {
        exclude: 'WRITE',
        pageSize: EXPECTED_PAGE_SIZE,
        refresh: true,
      },
    });
  });

  it('can paginate forward and back', async () => {
    const handleListLocations = jest.fn();

    useDataSpy.mockReturnValue([resolvedState, handleListLocations]);
    render(<LocationsView />);

    // table renders
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // pagination enabled
    const nextPage = await screen.findByLabelText('Go to next page');
    expect(nextPage).not.toBeDisabled();

    // first page data matches input
    expect(screen.queryByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.queryByText('item-0/')).toBeInTheDocument();
    expect(screen.queryByText('item-101/')).not.toBeInTheDocument();

    useDataSpy.mockReturnValue([nextPageState, handleListLocations]);

    // go forward
    await act(async () => {
      await userEvent.click(nextPage);
    });

    // second page data matches input
    expect(screen.queryByLabelText('Page 2')).toBeInTheDocument();
    expect(screen.queryByText('item-0/')).not.toBeInTheDocument();
    expect(screen.queryByText('item-101/')).toBeInTheDocument();

    // pagination enabled
    const previousPage = await screen.findByLabelText('Go to previous page');
    expect(previousPage).not.toBeDisabled();

    // go back
    await act(async () => {
      await userEvent.click(previousPage);
    });

    // first page data matches input
    expect(screen.queryByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.queryByText('item-0/')).toBeInTheDocument();
    expect(screen.queryByText('item-101/')).not.toBeInTheDocument();
  });

  it('should navigate to detail page when folder is clicked', async () => {
    useDataSpy.mockReturnValue([resolvedState, jest.fn()]);
    render(<LocationsView />);

    const scopeButton = await screen.findByText('item-0/');
    await userEvent.click(scopeButton);

    expect(dispatchStoreAction).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      location: {
        bucket: 'test-bucket',
        id: 'identity',
        prefix: 'item-0/',
        type: 'PREFIX',
        permission: 'READWRITE',
      },
    });
  });
});
