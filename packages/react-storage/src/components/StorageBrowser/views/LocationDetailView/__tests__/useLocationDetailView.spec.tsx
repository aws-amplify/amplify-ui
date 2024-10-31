import { renderHook, act } from '@testing-library/react';

import {
  useLocationDetailView,
  DEFAULT_LIST_OPTIONS,
} from '../useLocationDetailView';
import { LocationData, LocationItemData } from '../../../actions';
import * as ActionsModule from '../../../do-not-import-from-here/actions';
import * as StoreModule from '../../../providers/store';
import { HistoryState } from '../../../providers/store/history';

const useActionSpy = jest.spyOn(ActionsModule, 'useAction');
const useStoreSpy = jest.spyOn(StoreModule, 'useStore');

// fake date for mock data below
jest.useFakeTimers({ now: Date.UTC(2024, 0, 1) });
const testData: LocationItemData[] = [
  { id: '1', key: 'Location A', type: 'FOLDER' },
  {
    id: '2',
    key: 'Location B',
    type: 'FILE',
    lastModified: new Date(),
    size: 25600,
  },
  {
    id: '3',
    key: 'Location C',
    type: 'FILE',
    lastModified: new Date(),
    size: 12800,
  },
  {
    id: '4',
    key: 'Location D',
    type: 'FILE',
    lastModified: new Date(),
    size: 12800,
  },
  {
    id: '5',
    key: 'Location E',
    type: 'FILE',
    lastModified: new Date(),
    size: 25600,
  },
];

const EXPECTED_PAGE_SIZE = 3;

const testHistory: HistoryState = {
  current: {
    bucket: 'test-bucket',
    prefix: `item-b/`,
    permission: 'READ',
    id: '2',
    type: 'PREFIX',
  },
  previous: [
    {
      bucket: 'test-bucket',
      prefix: `item-a/`,
      permission: 'READ',
      id: '1',
      type: 'PREFIX',
    },
  ],
};

const testStoreState = {
  history: testHistory,
  files: [],
  locationItems: {
    fileDataItems: undefined,
  },
  actionType: undefined,
};

describe('useLocationsView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and set location data on mount', () => {
    const handleStoreActionMock = jest.fn();
    useStoreSpy.mockReturnValue([testStoreState, handleStoreActionMock]);
    const mockDataState = {
      data: { result: testData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };

    const handleListMock = jest.fn();
    useActionSpy.mockReturnValue([mockDataState, handleListMock]);

    const initialState = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result } = renderHook(() => useLocationDetailView(initialState));

    // fetches data
    expect(handleListMock).toHaveBeenCalledWith({
      options: {
        ...DEFAULT_LIST_OPTIONS,
        refresh: true,
        pageSize: EXPECTED_PAGE_SIZE,
      },
      prefix: 'item-b/',
    });

    const state = result.current;
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
    expect(state.pageItems.length).toEqual(EXPECTED_PAGE_SIZE);
  });

  it('should not fetch on mount for invalid prefix', () => {
    const mockHistory = { current: undefined, previous: undefined };
    const handleStoreActionMock = jest.fn();

    useStoreSpy.mockReturnValue([
      { ...testStoreState, history: mockHistory },
      handleStoreActionMock,
    ]);

    const mockDataState = {
      data: { result: testData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleListMock = jest.fn();
    useActionSpy.mockReturnValue([mockDataState, handleListMock]);

    renderHook(() =>
      useLocationDetailView({
        initialValues: { pageSize: EXPECTED_PAGE_SIZE },
      })
    );

    expect(handleListMock).not.toHaveBeenCalled();
  });

  it('should handle pagination actions', () => {
    const handleStoreActionMock = jest.fn();
    useStoreSpy.mockReturnValue([testStoreState, handleStoreActionMock]);
    const mockHandleList = jest.fn();

    // set up empty page
    useActionSpy.mockReturnValue([
      {
        data: {
          result: [],
          nextToken: undefined,
        },
        message: '',
        hasError: false,
        isLoading: false,
      },
      mockHandleList,
    ]);

    const initialValues = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result, rerender } = renderHook(() =>
      useLocationDetailView(initialValues)
    );

    expect(result.current.isPaginateNextDisabled).toBe(true);
    expect(result.current.isPaginatePreviousDisabled).toBe(true);
    expect(result.current.pageItems).toEqual([]);

    // set up first page mock
    const mockDataState = {
      data: {
        result: testData.slice(0, EXPECTED_PAGE_SIZE),
        nextToken: 'token123',
      },
      message: '',
      hasError: false,
      isLoading: false,
    };

    useActionSpy.mockReturnValue([mockDataState, mockHandleList]);

    rerender(initialValues);

    // set up second page mock
    useActionSpy.mockReturnValue([
      {
        data: { result: testData, nextToken: undefined },
        message: '',
        hasError: false,
        isLoading: false,
      },
      mockHandleList,
    ]);

    // go next
    act(() => {
      result.current.onPaginateNext();
    });

    // check if data is correct
    expect(result.current.page).toEqual(2);
    expect(result.current.isPaginateNextDisabled).toBe(true);
    expect(result.current.isPaginatePreviousDisabled).toBe(false);
    expect(result.current.pageItems).toEqual(testData.slice(3));

    // go previous
    act(() => {
      result.current.onPaginatePrevious();
    });

    // check data
    expect(result.current.page).toEqual(1);
    expect(result.current.isPaginateNextDisabled).toBe(false);
    expect(result.current.isPaginatePreviousDisabled).toBe(true);
    expect(result.current.pageItems).toEqual(testData.slice(0, 3));
  });

  it('should handle refreshing location data', () => {
    const handleStoreActionMock = jest.fn();
    useStoreSpy.mockReturnValue([testStoreState, handleStoreActionMock]);

    const mockDataState = {
      data: { result: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleListMock = jest.fn();
    useActionSpy.mockReturnValue([mockDataState, handleListMock]);

    const { result } = renderHook(() => useLocationDetailView());

    // move to next page to check behavior
    act(() => {
      result.current.onPaginateNext();
    });
    expect(result.current.page).toEqual(2);

    act(() => {
      result.current.onRefresh();
    });

    // refresh shows first page
    expect(result.current.page).toEqual(1);

    // data refreshed
    expect(handleListMock).toHaveBeenCalledWith({
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
      prefix: 'item-b/',
    });
  });

  it('should not refresh location data for invalid paths', () => {
    const mockHistory = { current: undefined, previous: undefined };
    const handleStoreActionMock = jest.fn();
    useStoreSpy.mockReturnValue([
      { ...testStoreState, history: mockHistory },
      handleStoreActionMock,
    ]);

    const mockDataState = {
      data: { result: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };

    const handleListMock = jest.fn();
    useActionSpy.mockReturnValue([mockDataState, handleListMock]);

    const { result } = renderHook(() => useLocationDetailView());

    act(() => {
      result.current.onRefresh();
    });
    expect(result.current.page).toEqual(1);
    expect(handleListMock).not.toHaveBeenCalled();
  });

  it('should handle selecting a location', () => {
    const mockHistory = { current: undefined, previous: undefined };
    const handleStoreActionMock = jest.fn();
    useStoreSpy.mockReturnValue([
      { ...testStoreState, history: mockHistory },
      handleStoreActionMock,
    ]);

    const { result } = renderHook(() => useLocationDetailView());

    const expectedLocation: LocationData = {
      bucket: 'test-bucket',
      prefix: `item-b/`,
      permission: 'READ',
      id: '2',
      type: 'PREFIX',
    };

    act(() => {
      const state = result.current;
      state.onAccessItem(expectedLocation);
    });

    expect(handleStoreActionMock).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      destination: expectedLocation,
    });
  });

  it('should handle adding files', () => {
    const handleStoreActionMock = jest.fn();
    const mockHistory = { current: undefined, previous: undefined };
    useStoreSpy.mockReturnValue([
      { ...testStoreState, history: mockHistory },
      handleStoreActionMock,
    ]);

    const { result } = renderHook(() => useLocationDetailView());
    // uploads files
    const mockFiles = Array(3)
      .fill(null)
      .map(
        (_, i) =>
          new File(['blob-part'], `blob-${i}.pdf`, { type: 'application/pdf' })
      );
    act(() => {
      const state = result.current;
      state.onAddFiles(mockFiles);
    });
    expect(handleStoreActionMock).toHaveBeenCalledWith({
      type: 'ADD_FILE_ITEMS',
      files: mockFiles,
    });
  });
});
