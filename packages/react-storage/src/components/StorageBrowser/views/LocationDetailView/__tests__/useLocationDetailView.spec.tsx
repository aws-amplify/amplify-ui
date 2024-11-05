import { renderHook, act } from '@testing-library/react';

import * as AmplifyReactCore from '@aws-amplify/ui-react-core';

import {
  useLocationDetailView,
  DEFAULT_LIST_OPTIONS,
} from '../useLocationDetailView';
import {
  ActionInputConfig,
  LocationData,
  LocationItemData,
} from '../../../actions';
import { FileData } from '../../../actions/handlers';
import * as StoreModule from '../../../providers/store';
import * as ConfigModule from '../../../providers/configuration';
import { LocationState } from '../../../providers/store/location';

const useActionSpy = jest.spyOn(AmplifyReactCore, 'useDataState');
const useStoreSpy = jest.spyOn(StoreModule, 'useStore');
const useGetActionSpy = jest.spyOn(ConfigModule, 'useGetActionInput');

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

const fileItem: FileData = {
  key: 'file-key',
  lastModified: new Date(1),
  id: 'file-id',
  size: 1,
  type: 'FILE',
};

const EXPECTED_PAGE_SIZE = 3;

const testLocation: LocationState = {
  current: {
    bucket: 'test-bucket',
    prefix: 'item-b/',
    permission: 'READ',
    id: '2',
    type: 'PREFIX',
  },
  path: '',
  key: 'item-b/',
};

const testStoreState = {
  location: testLocation,
  files: [],
  locationItems: {
    fileDataItems: undefined,
  },
  actionType: undefined,
};

const config: ActionInputConfig = {
  bucket: 'bucky',
  credentials: jest.fn(),
  region: 'us-weast-1',
};
useGetActionSpy.mockReturnValue(() => config);

describe('useLocationDetailView', () => {
  const mockLocation = { current: undefined, path: '', key: '' };
  // create mocks
  const mockDispatchStoreAction = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and set location data on mount', () => {
    useStoreSpy.mockReturnValue([testStoreState, mockDispatchStoreAction]);
    const mockDataState = {
      data: { items: testData, nextToken: undefined },
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
      config,
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
    useStoreSpy.mockReturnValue([
      { ...testStoreState, location: mockLocation },
      mockDispatchStoreAction,
    ]);

    const mockDataState = {
      data: { items: testData, nextToken: undefined },
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
    useStoreSpy.mockReturnValue([testStoreState, mockDispatchStoreAction]);
    const mockHandleList = jest.fn();

    // set up empty page
    useActionSpy.mockReturnValue([
      {
        data: {
          items: [],
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
        items: testData.slice(0, EXPECTED_PAGE_SIZE),
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
        data: { items: testData, nextToken: undefined },
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
    useStoreSpy.mockReturnValue([testStoreState, mockDispatchStoreAction]);

    const mockDataState = {
      data: { items: [], nextToken: undefined },
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
      config,
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
      prefix: 'item-b/',
    });
  });

  it('should not refresh location data for invalid paths', () => {
    useStoreSpy.mockReturnValue([
      { ...testStoreState, location: mockLocation },
      mockDispatchStoreAction,
    ]);

    const mockDataState = {
      data: { items: [], nextToken: undefined },
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
    useStoreSpy.mockReturnValue([
      { ...testStoreState, location: mockLocation },
      mockDispatchStoreAction,
    ]);

    const { result } = renderHook(() => useLocationDetailView());

    const expectedLocation: LocationData = {
      bucket: 'test-bucket',
      prefix: `item-b/`,
      permission: 'READ',
      id: '2',
      type: 'PREFIX',
    };

    const expectedPath = 'path-c/';

    act(() => {
      const state = result.current;
      state.onNavigate(expectedLocation, expectedPath);
    });

    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      location: expectedLocation,
      path: expectedPath,
    });
  });

  it('should handle adding files', () => {
    useStoreSpy.mockReturnValue([
      { ...testStoreState, location: mockLocation },
      mockDispatchStoreAction,
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
      state.onDropFiles(mockFiles);
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'ADD_FILE_ITEMS',
      files: mockFiles,
    });
  });

  it('should navigate home', () => {
    const mockOnExit = jest.fn();

    useStoreSpy.mockReturnValue([testStoreState, mockDispatchStoreAction]);
    const { result } = renderHook(() =>
      useLocationDetailView({ onExit: mockOnExit })
    );
    const state = result.current;
    state.onNavigateHome();

    expect(mockOnExit).toHaveBeenCalled();
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_ACTION_TYPE',
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
  });

  it('should set a file item as selected', () => {
    useStoreSpy.mockReturnValue([testStoreState, mockDispatchStoreAction]);
    const { result } = renderHook(() => useLocationDetailView());
    const state = result.current;
    state.onSelect(false, fileItem);

    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'SET_LOCATION_ITEMS',
      items: [fileItem],
    });
  });

  it('should set a file item as unselected', () => {
    useStoreSpy.mockReturnValue([testStoreState, mockDispatchStoreAction]);
    const { result } = renderHook(() => useLocationDetailView());
    const state = result.current;
    state.onSelect(true, fileItem);

    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'REMOVE_LOCATION_ITEM',
      id: fileItem.id,
    });
  });

  it('should set all file items as selected', () => {
    const mockDataState = {
      data: { items: testData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };

    useStoreSpy.mockReturnValue([
      {
        ...testStoreState,
        locationItems: {
          fileDataItems: [fileItem, fileItem, fileItem, fileItem],
        },
      },
      mockDispatchStoreAction,
    ]);
    useActionSpy.mockReturnValue([mockDataState, jest.fn()]);

    const { result } = renderHook(() => useLocationDetailView());
    const state = result.current;

    state.onSelectAll();

    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
  });

  it('should set all file items as unselected', () => {
    const mockDataState = {
      data: { items: testData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };

    useStoreSpy.mockReturnValue([
      {
        ...testStoreState,
        locationItems: {
          fileDataItems: [],
        },
      },
      mockDispatchStoreAction,
    ]);
    useActionSpy.mockReturnValue([mockDataState, jest.fn()]);

    const { result } = renderHook(() => useLocationDetailView());
    const state = result.current;

    state.onSelectAll();

    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'SET_LOCATION_ITEMS',
      items: testData.slice(1),
    });
  });
  it('should handle search', () => {
    const handleStoreActionMock = jest.fn();
    useStoreSpy.mockReturnValue([testStoreState, handleStoreActionMock]);
    const mockDataState = {
      data: { items: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleListMock = jest.fn();
    useActionSpy.mockReturnValue([mockDataState, handleListMock]);

    const { result } = renderHook(() => useLocationDetailView());
    act(() => {
      const state = result.current;
      state.onSearch('moo', true);
    });

    expect(handleListMock).toHaveBeenCalledWith({
      config,
      options: {
        ...DEFAULT_LIST_OPTIONS,
        delimiter: undefined,
        search: { filterKey: 'key', query: 'moo' },
      },
      prefix: 'item-b/',
    });
    expect(handleStoreActionMock).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
  });
});
