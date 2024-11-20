import { renderHook, act } from '@testing-library/react';
import { DataState } from '@aws-amplify/ui-react-core';

import { useLocationsView, DEFAULT_LIST_OPTIONS } from '../useLocationsView';

import * as ActionsModule from '../../../actions';
import * as StoreModule from '../../../providers/store';
import * as TasksModule from '../../../tasks';
import * as ConfigModule from '../../../providers/configuration';

jest.useFakeTimers();
jest.setSystemTime(1);

const dispatchStoreAction = jest.fn();
jest
  .spyOn(StoreModule, 'useStore')
  .mockReturnValue([{} as StoreModule.UseStoreState, dispatchStoreAction]);

const useLocationsDataSpy = jest.spyOn(ActionsModule, 'useListLocations');
const useGetActionSpy = jest.spyOn(ConfigModule, 'useGetActionInput');

const mockData: ActionsModule.LocationData[] = [
  {
    bucket: 'test-bucket',
    prefix: `item-a/`,
    permissions: ['delete', 'get', 'list', 'write'],
    id: '1',
    type: 'PREFIX',
  },
  {
    bucket: 'test-bucket',
    prefix: `item-b/`,
    permissions: ['get', 'list'],
    id: '2',
    type: 'PREFIX',
  },
  {
    bucket: 'test-bucket',
    prefix: `item-c/`,
    permissions: ['delete', 'get', 'list', 'write'],
    id: '3',
    type: 'OBJECT',
  },
  {
    bucket: 'test-bucket',
    prefix: `item-d/`,
    permissions: ['delete', 'get', 'list', 'write'],
    id: '4',
    type: 'PREFIX',
  },
  {
    bucket: 'test-bucket',
    prefix: `item-e/`,
    permissions: ['delete', 'get', 'list', 'write'],
    id: '5',
    type: 'BUCKET',
  },
];

const EXPECTED_PAGE_SIZE = 3;
function mockUseLocationsData(
  returnValue: DataState<ActionsModule.ListLocationsOutput>
) {
  const handleList = jest.fn();
  useLocationsDataSpy.mockReturnValue([returnValue, handleList]);
  return handleList;
}

const taskOne: TasksModule.Task<ActionsModule.FileDataItem> = {
  data: {
    fileKey: 'key',
    id: 'id',
    key: 'key',
    lastModified: new Date(1),
    size: 0,
    type: 'FILE',
  },
  cancel: jest.fn(),
  message: undefined,
  progress: undefined,
  status: 'QUEUED',
};

const handleDownload = jest.fn();
jest.spyOn(TasksModule, 'useProcessTasks').mockReturnValue([
  {
    reset: jest.fn(),
    isProcessing: false,
    isProcessingComplete: false,
    statusCounts: TasksModule.INITIAL_STATUS_COUNTS,
    tasks: [taskOne],
  },
  handleDownload,
]);

const config: ActionsModule.ActionInputConfig = {
  bucket: 'bucky',
  credentials: jest.fn(),
  region: 'us-weast-1',
};
useGetActionSpy.mockReturnValue(() => config);

const mockId = 'intentionally-static-test-id';
describe('useLocationsView', () => {
  beforeAll(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => mockId },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and set location data on mount', () => {
    const mockDataState = {
      data: { items: mockData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockUseLocationsData(mockDataState);
    const initialState = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result } = renderHook(() => useLocationsView(initialState));

    expect(handleList).toHaveBeenCalledWith({
      options: {
        ...DEFAULT_LIST_OPTIONS,
        refresh: true,
        pageSize: EXPECTED_PAGE_SIZE,
      },
    });

    const state = result.current;
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
    expect(state.pageItems.length).toEqual(EXPECTED_PAGE_SIZE);
  });

  it('should handle pagination actions', () => {
    // empty state
    mockUseLocationsData({
      data: {
        items: [],
        nextToken: undefined,
      },
      message: '',
      hasError: false,
      isLoading: false,
    });

    const initialState = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result, rerender } = renderHook(() =>
      useLocationsView(initialState)
    );

    expect(result.current.pageItems).toEqual([]);

    // mock first page data
    const mockDataState = {
      data: {
        items: mockData.slice(0, EXPECTED_PAGE_SIZE),
        nextToken: 'token123',
      },
      message: '',
      hasError: false,
      isLoading: false,
    };
    mockUseLocationsData(mockDataState);

    rerender(initialState);
    // check first page
    expect(result.current.page).toEqual(1);
    expect(result.current.pageItems).toEqual(
      mockData.slice(0, EXPECTED_PAGE_SIZE)
    );

    // mock next page
    mockUseLocationsData({
      data: { items: mockData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    });

    // go next
    act(() => {
      result.current.onPaginate(2);
    });

    // check next page
    expect(result.current.page).toEqual(2);
    expect(result.current.pageItems).toEqual(
      mockData.slice(EXPECTED_PAGE_SIZE)
    );

    // go back
    act(() => {
      result.current.onPaginate(1);
    });

    // check first page
    expect(result.current.page).toEqual(1);
    expect(result.current.pageItems).toEqual(
      mockData.slice(0, EXPECTED_PAGE_SIZE)
    );
  });

  it('should handle refreshing location data', () => {
    const mockDataState = {
      data: { items: [], nextToken: 'token123' },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockUseLocationsData(mockDataState);

    const { result } = renderHook(() => useLocationsView());

    // go to second page to verify reset behavior
    act(() => {
      result.current.onPaginate(2);
    });
    expect(result.current.page).toEqual(2);

    act(() => {
      result.current.onRefresh();
    });

    // refresh goes to first page
    expect(result.current.page).toEqual(1);

    // new data fetched
    expect(handleList).toHaveBeenCalledWith({
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  });

  it('should handle selecting a location', () => {
    const { result } = renderHook(() => useLocationsView());
    const expectedLocation = mockData[2];
    act(() => {
      const state = result.current;
      state.onNavigate(expectedLocation);
    });

    expect(dispatchStoreAction).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      location: expectedLocation,
    });
  });

  it('should handle downloading a file', () => {
    const { result } = renderHook(() => useLocationsView());
    const location: ActionsModule.LocationData = {
      bucket: 'bucket',
      id: 'id',
      permissions: ['get'],
      prefix: 'prefix',
      type: 'OBJECT',
    };

    result.current.onDownload(location);
    expect(handleDownload).toHaveBeenCalledTimes(1);
    expect(handleDownload).toHaveBeenCalledWith({
      config,
      data: {},
    });
  });

  it('should handle search', () => {
    const mockDataState = {
      data: { items: mockData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockUseLocationsData(mockDataState);
    const { result } = renderHook(() => useLocationsView());

    act(() => {
      result.current.onSearchQueryChange('item-b');
    });

    act(() => {
      result.current.onSearch();
    });

    expect(result.current.searchQuery).toBe('item-b');
    // search complete
    expect(handleList).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          search: {
            filterBy: expect.any(Function),
            query: 'item-b',
          },
        }),
      })
    );

    // clear search
    act(() => {
      result.current.onSearchClear();
    });

    expect(result.current.searchQuery).toEqual('');
    expect(handleList).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          refresh: true,
        }),
      })
    );
  });
});
