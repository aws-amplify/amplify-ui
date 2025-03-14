import { renderHook, act } from '@testing-library/react';

import {
  LocationData,
  LocationItemData,
  FileData,
  FileDataItem,
  FolderData,
} from '../../../actions';

import { useStore } from '../../../providers/store';
import { LocationState } from '../../../providers/store/location';
import { useAction, useList } from '../../../useAction';

import {
  useLocationDetailView,
  DEFAULT_LIST_OPTIONS,
} from '../useLocationDetailView';

jest.mock('../../../actions/handlers');
jest.mock('../../../providers/store');
jest.mock('../../../useAction');

const folderDataOne: FolderData = {
  id: '1',
  key: 'Location A',
  type: 'FOLDER',
};

const fileDataOne: FileDataItem = {
  id: '2',
  key: 'some-prefix/cool.jpg',
  fileKey: 'some-prefix/cool.jpg',
  type: 'FILE',
  lastModified: new Date(),
  size: 25600,
};

const fileDataTwo: FileDataItem = {
  id: '3',
  key: 'some-prefix/maybe-cool.png',
  fileKey: 'some-prefix/maybe-cool.png',
  type: 'FILE',
  lastModified: new Date(),
  size: 25600,
};

// fake date for mock data below
jest.useFakeTimers({ now: Date.UTC(2024, 0, 1) });
const testData: LocationItemData[] = [
  folderDataOne,
  fileDataOne,
  fileDataTwo,
  {
    id: '4',
    key: 'Location-D.doc',
    type: 'FILE',
    lastModified: new Date(),
    size: 12800,
  },
  {
    id: '5',
    key: 'Location-E.pdf',
    type: 'FILE',
    lastModified: new Date(),
    size: 25600,
  },
];

const fileItem: FileData = {
  key: 'some-prefix/file-key',
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
    permissions: ['list'],
    id: '2',
    type: 'PREFIX',
  },
  path: '',
  key: 'item-b-key/',
};

const testStoreState = {
  location: testLocation,
  files: [],
  locationItems: {
    fileDataItems: undefined,
  },
  actionType: undefined,
};

describe('useLocationDetailView', () => {
  const mockLocation = { current: undefined, path: '', key: '' };
  const mockDataState = {
    data: { items: testData, nextToken: undefined },
    message: '',
    hasError: false,
    isLoading: false,
  };
  const mockUseAction = jest.mocked(useAction);
  const mockUseList = jest.mocked(useList);
  const mockUseStore = jest.mocked(useStore);
  const mockDispatchStoreAction = jest.fn();
  const mockHandleDownload = jest.fn();
  const mockHandleList = jest.fn();

  beforeAll(() => {
    mockUseAction.mockReturnValue([{}, mockHandleDownload]);
  });

  beforeEach(() => {
    mockUseStore.mockReturnValue([testStoreState, mockDispatchStoreAction]);
    mockUseList.mockReturnValue([mockDataState, mockHandleList]);
  });

  afterEach(() => {
    mockUseAction.mockClear();
    mockDispatchStoreAction.mockClear();
    mockHandleDownload.mockClear();
    mockHandleList.mockClear();
    mockUseList.mockReset();
    mockUseStore.mockReset();
  });

  it('should fetch and set location data on mount', () => {
    const initialState = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result } = renderHook(() => useLocationDetailView(initialState));

    // fetches data
    expect(mockHandleList).toHaveBeenCalledWith({
      options: {
        ...DEFAULT_LIST_OPTIONS,
        refresh: true,
        pageSize: EXPECTED_PAGE_SIZE,
      },
      prefix: 'item-b-key/',
    });

    const state = result.current;
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
    expect(state.pageItems.length).toEqual(EXPECTED_PAGE_SIZE);
  });

  it('should not fetch on mount for invalid prefix', () => {
    mockUseStore.mockReturnValue([
      { ...testStoreState, location: mockLocation },
      mockDispatchStoreAction,
    ]);

    renderHook(() =>
      useLocationDetailView({
        initialValues: { pageSize: EXPECTED_PAGE_SIZE },
      })
    );

    expect(mockHandleList).not.toHaveBeenCalled();
  });

  it('should handle pagination actions', () => {
    const mockHandleList = jest.fn();

    // set up empty page
    mockUseList.mockReturnValue([
      {
        data: { items: [], nextToken: undefined },
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

    mockUseList.mockReturnValue([mockDataState, mockHandleList]);

    rerender(initialValues);

    // set up second page mock
    mockUseList.mockReturnValue([
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
      result.current.onPaginate(2);
    });

    // check if data is correct
    expect(result.current.page).toEqual(2);
    expect(result.current.pageItems).toEqual(testData.slice(3));

    // go previous
    act(() => {
      result.current.onPaginate(1);
    });

    // check data
    expect(result.current.page).toEqual(1);
    expect(result.current.pageItems).toEqual(testData.slice(0, 3));
  });

  it('should handle refreshing location data', () => {
    const mockDataState = {
      data: { items: [], nextToken: 'token123' },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const mockHandleList = jest.fn();
    mockUseList.mockReturnValue([mockDataState, mockHandleList]);

    const { result } = renderHook(() => useLocationDetailView());

    // move to next page to check behavior
    act(() => {
      result.current.onPaginate(2);
    });
    expect(result.current.page).toEqual(2);

    act(() => {
      result.current.onRefresh();
    });

    // refresh shows first page
    expect(result.current.page).toEqual(1);

    // data refreshed
    expect(mockHandleList).toHaveBeenCalledWith({
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
      prefix: 'item-b-key/',
    });
  });

  it('should not refresh location data for invalid paths', () => {
    mockUseStore.mockReturnValue([
      { ...testStoreState, location: mockLocation },
      mockDispatchStoreAction,
    ]);

    const mockDataState = {
      data: { items: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };

    const mockHandleList = jest.fn();
    mockUseList.mockReturnValue([mockDataState, mockHandleList]);

    const { result } = renderHook(() => useLocationDetailView());

    act(() => {
      result.current.onRefresh();
    });
    expect(result.current.page).toEqual(1);
    expect(mockHandleList).not.toHaveBeenCalled();
  });

  it('should handle selecting a location', () => {
    mockUseStore.mockReturnValue([
      { ...testStoreState, location: mockLocation },
      mockDispatchStoreAction,
    ]);

    const { result } = renderHook(() => useLocationDetailView());

    const expectedLocation: LocationData = {
      bucket: 'test-bucket',
      prefix: `item-b/`,
      permissions: ['list'],
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

  it('should handle downloading a file', () => {
    const { result } = renderHook(() =>
      useLocationDetailView({ onExit: jest.fn() })
    );

    result.current.onDownload(fileDataOne);
    expect(mockHandleDownload).toHaveBeenCalledTimes(1);
    expect(mockHandleDownload).toHaveBeenCalledWith({ data: fileDataOne });
  });

  it('should navigate home', () => {
    const mockOnExit = jest.fn();

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
    const { result } = renderHook(() => useLocationDetailView());
    const state = result.current;
    state.onSelect(false, fileItem);

    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'SET_LOCATION_ITEMS',
      items: [fileItem],
    });
  });

  it('should set a file item as unselected', () => {
    const { result } = renderHook(() => useLocationDetailView());
    const state = result.current;
    state.onSelect(true, fileItem);

    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'REMOVE_LOCATION_ITEM',
      id: fileItem.id,
    });
  });

  it('should set all file items as selected', () => {
    mockUseStore.mockReturnValue([
      {
        ...testStoreState,
        locationItems: { fileDataItems: undefined },
      },
      mockDispatchStoreAction,
    ]);

    const mockDataState = {
      data: {
        items: [folderDataOne, fileDataOne, fileDataTwo],
        nextToken: undefined,
      },
      message: '',
      hasError: false,
      isLoading: false,
    };

    mockUseList.mockReturnValue([mockDataState, jest.fn()]);

    const { result } = renderHook(() => useLocationDetailView());
    const { onToggleSelectAll } = result.current;

    onToggleSelectAll();

    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'SET_LOCATION_ITEMS',
      items: [fileDataOne, fileDataTwo],
    });
  });

  it('should set all file items as unselected', () => {
    const mockDataState = {
      data: {
        items: [folderDataOne, fileDataOne, fileDataTwo],
        nextToken: undefined,
      },
      message: '',
      hasError: false,
      isLoading: false,
    };

    // selected file items
    const fileDataItemOne: FileDataItem = {
      ...fileDataOne,
      fileKey: 'cool.jpg',
    };
    const fileDataItemTwo: FileDataItem = {
      ...fileDataTwo,
      fileKey: 'maybe-cool.png',
    };

    mockUseStore.mockReturnValue([
      {
        ...testStoreState,
        locationItems: { fileDataItems: [fileDataItemOne, fileDataItemTwo] },
      },
      mockDispatchStoreAction,
    ]);
    mockUseList.mockReturnValue([mockDataState, jest.fn()]);

    const { result } = renderHook(() => useLocationDetailView());
    const { onToggleSelectAll } = result.current;

    onToggleSelectAll();

    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
  });

  it('should handle adding files', () => {
    mockUseStore.mockReturnValue([
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
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'SET_ACTION_TYPE',
      actionType: 'upload',
    });
  });

  it('should handle adding folders', () => {
    mockUseStore.mockReturnValue([
      { ...testStoreState, location: mockLocation },
      mockDispatchStoreAction,
    ]);

    const { result } = renderHook(() => useLocationDetailView());
    // uploads folder
    const mockFolder = new File([''], 'Folder', { type: '' });
    act(() => {
      const state = result.current;
      state.onDropFiles([mockFolder]);
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'ADD_FILE_ITEMS',
      files: [mockFolder],
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'SET_ACTION_TYPE',
      actionType: 'upload',
    });
  });

  it('should handle as files if adding files and folders', () => {
    mockUseStore.mockReturnValue([
      { ...testStoreState, location: mockLocation },
      mockDispatchStoreAction,
    ]);

    const { result } = renderHook(() => useLocationDetailView());

    const mockFile = new File(['blob-part'], `blob.pdf`, {
      type: 'application/pdf',
    });
    const mockFolder = new File([''], 'Folder', { type: '' });
    act(() => {
      const state = result.current;
      state.onDropFiles([mockFile, mockFolder]);
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'ADD_FILE_ITEMS',
      files: [mockFile, mockFolder],
    });
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'SET_ACTION_TYPE',
      actionType: 'upload',
    });
  });

  it('should handle search', () => {
    const handleStoreActionMock = jest.fn();
    mockUseStore.mockReturnValue([testStoreState, handleStoreActionMock]);
    const mockDataState = {
      data: { items: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const mockHandleList = jest.fn();
    mockUseList.mockReturnValue([mockDataState, mockHandleList]);

    const { result } = renderHook(() => useLocationDetailView());
    act(() => {
      result.current.onSearchQueryChange('moo');
    });

    act(() => {
      result.current.onSearch();
    });

    // search complete
    expect(mockHandleList).toHaveBeenCalledWith({
      options: {
        ...DEFAULT_LIST_OPTIONS,
        delimiter: '/',
        search: { filterBy: 'key', query: 'moo' },
      },
      prefix: 'item-b-key/',
    });
    expect(handleStoreActionMock).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });

    // clears search
    act(() => {
      result.current.onSearchClear();
    });

    expect(mockHandleList).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          refresh: true,
        }),
      })
    );
  });

  it('should handle search with subfolders', () => {
    const handleStoreActionMock = jest.fn();
    mockUseStore.mockReturnValue([testStoreState, handleStoreActionMock]);
    const mockDataState = {
      data: { items: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const mockHandleList = jest.fn();
    mockUseList.mockReturnValue([mockDataState, mockHandleList]);

    const { result } = renderHook(() => useLocationDetailView());
    act(() => {
      result.current.onSearchQueryChange('moo');
      result.current.onToggleSearchSubfolders();
    });

    act(() => {
      result.current.onSearch();
    });

    // search complete
    expect(mockHandleList).toHaveBeenCalledWith({
      options: {
        ...DEFAULT_LIST_OPTIONS,
        delimiter: undefined,
        search: { filterBy: 'key', query: 'moo', groupBy: '/' },
      },
      prefix: 'item-b-key/',
    });
    expect(handleStoreActionMock).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });

    // clears search
    act(() => {
      result.current.onSearchClear();
    });

    expect(mockHandleList).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          refresh: true,
        }),
      })
    );
  });

  it('should handle action selection', () => {
    const mockOnActionSelect = jest.fn();
    const actionType = 'action-type';

    const { result } = renderHook(() =>
      useLocationDetailView({ onActionSelect: mockOnActionSelect })
    );
    result.current.onActionSelect(actionType);

    expect(mockOnActionSelect).toHaveBeenCalledWith(actionType);
    expect(mockDispatchStoreAction).toHaveBeenCalledWith({
      type: 'SET_ACTION_TYPE',
      actionType,
    });
  });
});
