import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as ActionsModule from '../../../actions';
import * as ConfigModule from '../../../providers/configuration';
import * as StoreModule from '../../../providers/store';

import { LocationsView } from '../LocationsView';
import { DEFAULT_LIST_OPTIONS } from '../useLocationsView';
import { ActionInputConfig, LocationData } from '../../../actions';
import { DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT } from '../../../displayText/libraries';
import { useDisplayText } from '../../../displayText';

jest.mock('../../../displayText', () => {
  const mockGetListLocationsResultMessage = jest.fn();
  return {
    useDisplayText: () => ({
      LocationsView: {
        ...DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationsView,
        getListLocationsResultMessage: mockGetListLocationsResultMessage,
      },
    }),
  };
});

const dispatchStoreAction = jest.fn();
jest
  .spyOn(StoreModule, 'useStore')
  .mockReturnValue([{} as StoreModule.UseStoreState, dispatchStoreAction]);

const useGetActionSpy = jest.spyOn(ConfigModule, 'useGetActionInput');
const useListLocationsSpy = jest.spyOn(ActionsModule, 'useListLocations');
const mockUseDisplayText = jest.mocked(useDisplayText);
const mockGetListLocationsResultMessage = jest.mocked(
  mockUseDisplayText().LocationsView.getListLocationsResultMessage
);

const generateMockItems = (size: number, page: number): LocationData[] => {
  return Array(size)
    .fill(null)
    .map((_, index) => {
      index = index + size * (page - 1);
      const type = page % 2 == 0 ? 'BUCKET' : 'PREFIX';
      return {
        bucket: 'test-bucket',
        prefix: `item-${index}/`,
        permissions: ['delete', 'get', 'list', 'write'],
        id: `identity-${index}`,
        type,
      };
    });
};

const handleListLocations = jest.fn();
const initialState: ActionsModule.UseListLocationsState = [
  {
    data: { items: [], nextToken: undefined },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];

const loadingState: ActionsModule.UseListLocationsState = [
  {
    data: { items: [], nextToken: undefined },
    hasError: false,
    isLoading: true,
    message: undefined,
  },
  handleListLocations,
];

const EXPECTED_PAGE_SIZE = DEFAULT_LIST_OPTIONS.pageSize;
const items: LocationData[] = generateMockItems(EXPECTED_PAGE_SIZE, 1);

const resolvedState: ActionsModule.UseListLocationsState = [
  {
    data: {
      items,
      nextToken: 'some-token',
    },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];

const nextPageitems = generateMockItems(EXPECTED_PAGE_SIZE, 2);

const nextPageState: ActionsModule.UseListLocationsState = [
  {
    data: {
      items: [...items, ...nextPageitems],
      nextToken: undefined,
    },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];

const config: ActionInputConfig = {
  bucket: 'bucky',
  credentials: jest.fn(),
  region: 'us-west-1',
};
useGetActionSpy.mockReturnValue(() => config);

describe('LocationsListView', () => {
  afterEach(() => {
    mockGetListLocationsResultMessage.mockClear();
    jest.clearAllMocks();
  });

  it('renders and calls appropriate hooks', () => {
    useListLocationsSpy.mockReturnValue([
      {
        data: { items, nextToken: undefined },
        hasError: true,
        isLoading: false,
        message: undefined,
      },
      handleListLocations,
    ]);

    render(<LocationsView />);

    expect(useListLocationsSpy).toHaveBeenCalled();
  });

  it('invokes getListLocationsResultMessage() with `errorMessage` param', () => {
    const errorMessage = 'Something went wrong.';

    useListLocationsSpy.mockReturnValue([
      {
        data: { items, nextToken: undefined },
        hasError: true,
        isLoading: false,
        message: errorMessage,
      },
      handleListLocations,
    ]);

    render(<LocationsView />);

    expect(mockGetListLocationsResultMessage).toHaveBeenCalledWith({
      locations: expect.any(Array),
      hasError: true,
      message: errorMessage,
    });

    // table doesn't render
    const table = screen.queryByRole('table');
    expect(table).not.toBeInTheDocument();

    // pagination disabled
    const nextPage = screen.getByLabelText('Go to next page');
    expect(nextPage).toBeDisabled();
    const prevPage = screen.getByLabelText('Go to previous page');
    expect(prevPage).toBeDisabled();
  });

  it('renders a Locations View table', () => {
    useListLocationsSpy.mockReturnValue(resolvedState);

    render(<LocationsView />);

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
  });

  it.todo('handles failure from locations loading as expected');

  it.todo('handles empty locations result data as expected');

  it('behaves as expected on initial render', () => {
    useListLocationsSpy
      .mockReturnValueOnce(initialState)
      .mockReturnValueOnce(loadingState)
      .mockReturnValue(resolvedState);

    const { rerender } = render(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledWith({
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
    useListLocationsSpy.mockReturnValue(resolvedState);

    render(<LocationsView />);

    const refreshButton = screen.getByLabelText('Refresh data');
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

    useListLocationsSpy.mockReturnValue(initialState);

    // initial
    const { rerender } = render(<LocationsView />);

    useListLocationsSpy.mockReturnValue(loadingState);

    // loading
    rerender(<LocationsView />);

    useListLocationsSpy.mockReturnValueOnce(resolvedState);

    // resolved
    rerender(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledWith({
      options: {
        exclude: { exactPermissions: ['delete', 'write'] },
        pageSize: EXPECTED_PAGE_SIZE,
        refresh: true,
      },
    });
    expect(updatedHandleListLocations).not.toHaveBeenCalled();

    useListLocationsSpy.mockReturnValue([
      { ...resolvedState[0] },
      updatedHandleListLocations,
    ]);

    // reference change
    rerender(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledWith({
      options: {
        exclude: { exactPermissions: ['delete', 'write'] },
        pageSize: EXPECTED_PAGE_SIZE,
        refresh: true,
      },
    });
  });

  it('can paginate forward and back', async () => {
    useListLocationsSpy.mockReturnValue(resolvedState);
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

    useListLocationsSpy.mockReturnValue(nextPageState);

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
    useListLocationsSpy.mockReturnValue(resolvedState);
    render(<LocationsView />);

    const scopeButton = await screen.findByText('item-0/');
    await userEvent.click(scopeButton);

    expect(dispatchStoreAction).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      location: {
        bucket: 'test-bucket',
        id: 'identity-0',
        prefix: 'item-0/',
        type: 'PREFIX',
        permissions: ['delete', 'get', 'list', 'write'],
      },
    });
  });

  it('allows searching for items', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByText, queryByText, getByLabelText } =
      render(<LocationsView />);

    const input = getByPlaceholderText('Filter folders and files');

    expect(input).toBeInTheDocument();
    expect(queryByText('item-0/')).toBeInTheDocument();
    expect(queryByText('item-1/')).toBeInTheDocument();

    input.focus();
    await act(async () => {
      await user.keyboard('item-0');
      await user.click(getByText('Submit'));
    });

    // search complete
    expect(queryByText('item-0/')).toBeInTheDocument();
    expect(queryByText('item-1/')).not.toBeInTheDocument();

    // refresh
    await act(async () => {
      await user.click(getByLabelText('Refresh data'));
    });

    // clears search
    expect(queryByText('item-0/')).toBeInTheDocument();
    expect(queryByText('item-1/')).toBeInTheDocument();
  });
});
