import { act, renderHook, waitFor } from '@testing-library/react';

import {
  FileData,
  FileDataItem,
  FolderData,
  LocationData,
  LocationItemData,
} from '../../../actions';

import { useFileItems } from '../../../fileItems';
import { useLocationItems } from '../../../locationItems/context';
import { useSortConfig } from '../../../configuration';
import { LocationState, useStore } from '../../../store';
import { useAction, useList } from '../../../useAction';
import { useFilePreview } from '../../hooks/useFilePreview';

import {
  DEFAULT_LIST_OPTIONS,
  useLocationDetailView,
} from '../useLocationDetailView';
import { InitialValues } from '../types';

jest.mock('../../../actions/handlers');
jest.mock('../../../fileItems');
jest.mock('../../../locationItems/context');
jest.mock('../../../store');
jest.mock('../../../useAction');
jest.mock('../../hooks/useFilePreview');
jest.mock('../../../configuration', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  ...(jest.requireActual('../../../configuration') as object),
  usePaginationConfig: jest.fn((initialValues: InitialValues) => ({
    pageSize: initialValues?.pageSize ?? 100,
  })),
  useSortConfig: jest.fn(() => ({ sortScope: 'page' })),
}));

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
const fileDataThree: FileDataItem = {
  id: '4',
  key: 'Location-D.doc',
  fileKey: 'Location-D.doc',
  type: 'FILE',
  lastModified: new Date(),
  size: 12800,
};
const fileDataFour: FileDataItem = {
  id: '5',
  key: 'Location-E.pdf',
  fileKey: 'Location-E.pdf',
  type: 'FILE',
  lastModified: new Date(),
  size: 25600,
};

// fake date for mock data below
jest.useFakeTimers({ now: Date.UTC(2024, 0, 1) });
const mockItems: LocationItemData[] = [
  folderDataOne,
  fileDataOne,
  fileDataTwo,
  fileDataThree,
  fileDataFour,
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

const mockLocationItemsState = { fileDataItems: undefined };
const mockStoreState = { location: testLocation, actionType: undefined };
const mockFileItemsState = { validItems: undefined, invalidItems: undefined };

const mockLocation = { current: undefined, path: '', key: '' };
const mockListState = {
  value: { items: mockItems, nextToken: undefined },
  message: '',
  hasError: false,
  isLoading: false,
};

describe('useLocationDetailView', () => {
  const mockUseAction = jest.mocked(useAction);
  const mockUseFileItems = jest.mocked(useFileItems);
  const mockUseList = jest.mocked(useList);
  const mockUseLocationItems = jest.mocked(useLocationItems);
  const mockUseStore = jest.mocked(useStore);
  const mockUseFilePreview = jest.mocked(useFilePreview);

  const mockStoreDispatch = jest.fn();
  const mockLocationItemsDispatch = jest.fn();
  const mockFileItemsDispatch = jest.fn();
  const mockHandleDownload = jest.fn();
  const mockHandleList = jest.fn();

  beforeAll(() => {
    mockUseAction.mockReturnValue([
      { isProcessing: false, task: undefined },
      mockHandleDownload,
    ]);

    mockUseFilePreview.mockReturnValue({
      optout: false,
      enabled: false,
      handleRetry: jest.fn(),
    });
  });

  beforeEach(() => {
    mockUseStore.mockReturnValue([mockStoreState, mockStoreDispatch]);
    mockUseFileItems.mockReturnValue([
      mockFileItemsState,
      mockFileItemsDispatch,
    ]);
    mockUseLocationItems.mockReturnValue([
      mockLocationItemsState,
      mockLocationItemsDispatch,
    ]);
    mockUseList.mockReturnValue([mockListState, mockHandleList]);
  });

  afterEach(jest.clearAllMocks);

  it('should fetch and set location data on mount', () => {
    const initialState = { pageSize: EXPECTED_PAGE_SIZE };
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
      { ...mockStoreState, location: mockLocation },
      mockStoreDispatch,
    ]);

    renderHook(() =>
      useLocationDetailView({
        pageSize: EXPECTED_PAGE_SIZE,
      })
    );

    expect(mockHandleList).not.toHaveBeenCalled();
  });

  it('should handle pagination actions', () => {
    const mockHandleList = jest.fn();

    // set up empty page
    mockUseList.mockReturnValue([
      {
        value: { items: [], nextToken: undefined },
        message: '',
        hasError: false,
        isLoading: false,
      },
      mockHandleList,
    ]);

    const initialValues = { pageSize: EXPECTED_PAGE_SIZE };
    const { result, rerender } = renderHook(() =>
      useLocationDetailView(initialValues)
    );

    expect(result.current.pageItems).toEqual([]);

    // set up first page mock
    const mockListState = {
      value: {
        items: mockItems.slice(0, EXPECTED_PAGE_SIZE),
        nextToken: 'token123',
      },
      message: '',
      hasError: false,
      isLoading: false,
    };

    mockUseList.mockReturnValue([mockListState, mockHandleList]);

    rerender(initialValues);

    // set up second page mock
    mockUseList.mockReturnValue([
      {
        value: { items: mockItems, nextToken: undefined },
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
    expect(result.current.pageItems).toEqual(mockItems.slice(3));

    // go previous
    act(() => {
      result.current.onPaginate(1);
    });

    // check data
    expect(result.current.page).toEqual(1);
    expect(result.current.pageItems).toEqual(mockItems.slice(0, 3));
  });

  it('should handle refreshing location data', () => {
    const mockListState = {
      value: { items: [], nextToken: 'token123' },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const mockHandleList = jest.fn();
    mockUseList.mockReturnValue([mockListState, mockHandleList]);

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
      { ...mockStoreState, location: mockLocation },
      mockStoreDispatch,
    ]);

    const mockListState = {
      value: { items: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };

    const mockHandleList = jest.fn();
    mockUseList.mockReturnValue([mockListState, mockHandleList]);

    const { result } = renderHook(() => useLocationDetailView());

    act(() => {
      result.current.onRefresh();
    });
    expect(result.current.page).toEqual(1);
    expect(mockHandleList).not.toHaveBeenCalled();
  });

  it('should handle selecting a location', () => {
    mockUseStore.mockReturnValue([
      { ...mockStoreState, location: mockLocation },
      mockStoreDispatch,
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

    expect(mockStoreDispatch).toHaveBeenCalledWith({
      type: 'CHANGE_LOCATION',
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
    mockUseLocationItems.mockReturnValue([
      mockLocationItemsState,
      mockLocationItemsDispatch,
    ]);

    const { result } = renderHook(() =>
      useLocationDetailView({ onExit: mockOnExit })
    );
    const state = result.current;
    state.onNavigateHome();

    expect(mockOnExit).toHaveBeenCalled();
    expect(mockStoreDispatch).toHaveBeenCalledWith({
      type: 'RESET_ACTION_TYPE',
    });
    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
  });

  it('should set a file item as selected', () => {
    const { result } = renderHook(() => useLocationDetailView());
    const state = result.current;
    state.onSelect(false, fileItem);

    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'SET_LOCATION_ITEMS',
      items: [fileItem],
    });
  });

  it('should set a file item as unselected', () => {
    const { result } = renderHook(() => useLocationDetailView());
    const state = result.current;
    state.onSelect(true, fileItem);

    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_LOCATION_ITEM',
      id: fileItem.id,
    });
  });

  it('should set all items as selected', () => {
    mockUseStore.mockReturnValue([mockStoreState, mockStoreDispatch]);

    mockUseLocationItems.mockReturnValue([
      { fileDataItems: undefined },
      mockLocationItemsDispatch,
    ]);

    const mockDataState = {
      value: {
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

    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'SET_LOCATION_ITEMS',
      items: [folderDataOne, fileDataOne, fileDataTwo],
    });
  });

  it('should set all items as unselected', () => {
    const mockDataState = {
      value: {
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

    mockUseStore.mockReturnValue([mockStoreState, mockStoreDispatch]);
    mockUseLocationItems.mockReturnValue([
      { dataItems: [folderDataOne, fileDataItemOne, fileDataItemTwo] },
      mockLocationItemsDispatch,
    ]);
    mockUseList.mockReturnValue([mockDataState, jest.fn()]);

    const { result } = renderHook(() => useLocationDetailView());
    const { onToggleSelectAll } = result.current;

    onToggleSelectAll();

    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
  });

  it('should handle adding files', () => {
    mockUseStore.mockReturnValue([
      { ...mockStoreState, location: mockLocation },
      mockStoreDispatch,
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
    expect(mockFileItemsDispatch).toHaveBeenCalledWith({
      type: 'ADD_FILES',
      files: mockFiles,
    });
    expect(mockStoreDispatch).toHaveBeenCalledWith({
      type: 'CHANGE_ACTION_TYPE',
      actionType: 'upload',
    });
  });

  it('should handle adding folders', () => {
    mockUseStore.mockReturnValue([
      { ...mockStoreState, location: mockLocation },
      mockStoreDispatch,
    ]);

    const { result } = renderHook(() => useLocationDetailView());
    // uploads folder
    const mockFolder = new File([''], 'Folder', { type: '' });
    act(() => {
      const state = result.current;
      state.onDropFiles([mockFolder]);
    });
    expect(mockFileItemsDispatch).toHaveBeenCalledWith({
      type: 'ADD_FILES',
      files: [mockFolder],
    });
    expect(mockStoreDispatch).toHaveBeenCalledWith({
      type: 'CHANGE_ACTION_TYPE',
      actionType: 'upload',
    });
  });

  it('should handle as files if adding files and folders', () => {
    mockUseStore.mockReturnValue([
      { ...mockStoreState, location: mockLocation },
      mockStoreDispatch,
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
    expect(mockFileItemsDispatch).toHaveBeenCalledWith({
      type: 'ADD_FILES',
      files: [mockFile, mockFolder],
    });
    expect(mockStoreDispatch).toHaveBeenCalledWith({
      type: 'CHANGE_ACTION_TYPE',
      actionType: 'upload',
    });
  });

  it('should handle search', () => {
    mockUseStore.mockReturnValue([mockStoreState, mockStoreDispatch]);
    const mockDataState = {
      value: { items: [], nextToken: undefined },
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
        search: {
          filterBy: 'key',
          query: 'moo',
          groupBy: undefined,
          onProgress: expect.any(Function),
        },
      },
      prefix: 'item-b-key/',
    });
    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
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
    mockUseStore.mockReturnValue([mockStoreState, mockStoreDispatch]);
    const mockDataState = {
      value: { items: [], nextToken: undefined },
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
        search: {
          filterBy: 'key',
          query: 'moo',
          groupBy: '/',
          onProgress: expect.any(Function),
        },
      },
      prefix: 'item-b-key/',
    });
    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
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
    expect(mockStoreDispatch).toHaveBeenCalledWith({
      type: 'CHANGE_ACTION_TYPE',
      actionType,
    });
  });

  it('should return file preview state and handlers', () => {
    const fileData = {
      id: 'test',
      key: 'test.jpg',
      lastModified: new Date(),
      size: 1024,
      type: 'FILE' as const,
    };
    const mockHandleRetry = jest.fn();

    mockUseFilePreview.mockReturnValue({
      optout: false,
      enabled: true,
      ok: true,
      isLoading: false,
      fileData,
      url: 'https://example.com/test.jpg',
      handleRetry: mockHandleRetry,
    });

    const { result } = renderHook(() => useLocationDetailView());

    expect(result.current.filePreviewState).toEqual({
      fileData,
      isLoading: false,
      ok: true,
      enabled: true,
      url: 'https://example.com/test.jpg',
    });

    expect(result.current.onRetryFilePreview).toBe(mockHandleRetry);
  });

  it('should set a file item as active and unset it', () => {
    const { result, rerender } = renderHook(() => useLocationDetailView());
    const state = result.current;

    act(() => {
      state.onSelectActiveFile(fileItem);
    });

    act(() => {
      rerender();
    });
    waitFor(() => {
      expect(result.current.activeFile).toEqual(fileItem);
    });
    act(() => {
      state.onSelectActiveFile();
    });
    act(() => {
      rerender();
    });
    waitFor(() => {
      expect(result.current.activeFile).toBe(undefined);
    });
  });

  it('should navigate to previous item', () => {
    const { result, rerender } = renderHook(() => useLocationDetailView());
    const state = result.current;
    expect(state.pageItems).toHaveLength(5);
    act(() => {
      state.onSelectActiveFile(fileDataTwo);
    });
    act(() => {
      rerender();
    });
    waitFor(() => {
      expect(result.current.activeFileHasPrev).toBe(true);
      expect(result.current.activeFileHasNext).toBe(true);
    });
    act(() => {
      result.current.onSelectActiveFile('prev');
    });
    waitFor(() => {
      expect(result.current.activeFile).toEqual(fileDataOne);
      expect(result.current.activeFileHasPrev).toBe(false);
      expect(result.current.activeFileHasNext).toBe(true);
    });
  });

  it('should navigate to next item', () => {
    const { result, rerender } = renderHook(() => useLocationDetailView());
    const state = result.current;
    expect(state.pageItems).toHaveLength(5);
    act(() => {
      state.onSelectActiveFile(fileDataThree);
    });
    act(() => {
      rerender();
    });
    waitFor(() => {
      expect(result.current.activeFileHasPrev).toBe(true);
      expect(result.current.activeFileHasNext).toBe(true);
    });
    act(() => {
      result.current.onSelectActiveFile('next');
    });
    waitFor(() => {
      expect(result.current.activeFile).toEqual(fileDataFour);
      expect(result.current.activeFileHasPrev).toBe(true);
      expect(result.current.activeFileHasNext).toBe(false);
    });
  });

  describe('file preview closure', () => {
    it('closes file preview on refresh', () => {
      (useFilePreview as jest.Mock).mockReturnValue({
        onRetryFilePreview: jest.fn(),
        enabled: true,
        ok: true,
        isLoading: true,
      });

      const { result, rerender } = renderHook(() => useLocationDetailView());
      act(() => {
        result.current.onSelectActiveFile(fileDataOne);
      });
      rerender();
      waitFor(() => {
        expect(result.current.activeFile).toEqual(fileDataOne);
      });
      act(() => {
        result.current.onRefresh();
      });
      waitFor(() => {
        expect(result.current.activeFile).toBe(undefined);
      });
    });

    it('closes file preview on pagination', () => {
      (useFilePreview as jest.Mock).mockReturnValue({
        onRetryFilePreview: jest.fn(),
        enabled: true,
        ok: true,
        isLoading: true,
      });

      const { result, rerender } = renderHook(() => useLocationDetailView());
      act(() => {
        result.current.onSelectActiveFile(fileDataOne);
      });
      rerender();
      waitFor(() => {
        expect(result.current.activeFile).toEqual(fileDataOne);
      });
      act(() => {
        result.current.onPaginate(2);
      });
      waitFor(() => {
        expect(result.current.activeFile).toBe(undefined);
      });
    });

    it('closes file preview on navigation', () => {
      const mockLocation: LocationData = {
        bucket: 'test-bucket',
        id: 'test-id',
        permissions: ['list'],
        prefix: 'test-prefix/',
        type: 'PREFIX',
      };
      (useFilePreview as jest.Mock).mockReturnValue({
        onRetryFilePreview: jest.fn(),
        enabled: true,
        ok: true,
        isLoading: true,
      });

      const { result, rerender } = renderHook(() => useLocationDetailView());
      act(() => {
        result.current.onSelectActiveFile(fileDataOne);
      });
      rerender();
      waitFor(() => {
        expect(result.current.activeFile).toEqual(fileDataOne);
      });
      act(() => {
        result.current.onNavigate(mockLocation);
      });
      waitFor(() => {
        expect(result.current.activeFile).toBe(undefined);
      });
    });

    it('closes file preview on search', () => {
      (useFilePreview as jest.Mock).mockReturnValue({
        onRetryFilePreview: jest.fn(),
        enabled: true,
        ok: true,
        isLoading: true,
      });

      const { result, rerender } = renderHook(() => useLocationDetailView());
      act(() => {
        result.current.onSelectActiveFile(fileDataOne);
      });
      rerender();
      waitFor(() => {
        expect(result.current.activeFile).toEqual(fileDataOne);
      });
      act(() => {
        result.current.onSearch();
      });
      waitFor(() => {
        expect(result.current.activeFile).toBe(undefined);
      });
    });
  });

  describe('search pagination and progress', () => {
    it('should set hasNextPage true when search results span multiple local pages', () => {
      const manyItems: LocationItemData[] = Array.from(
        { length: 200 },
        (_, i) => ({
          key: `some-prefix/file-${i}.txt`,
          id: `id-${i}`,
          type: 'FILE' as const,
          lastModified: new Date(),
          size: 1024,
        })
      );

      mockUseList.mockReturnValue([
        {
          value: { items: manyItems, nextToken: undefined },
          message: '',
          hasError: false,
          isLoading: false,
        },
        mockHandleList,
      ]);

      const { result } = renderHook(() =>
        useLocationDetailView({ pageSize: EXPECTED_PAGE_SIZE })
      );

      expect(result.current.hasNextPage).toBe(true);
    });

    it('should paginate through search results locally', () => {
      const searchItems: LocationItemData[] = Array.from(
        { length: 10 },
        (_, i) => ({
          key: `some-prefix/file-${i}.txt`,
          id: `id-${i}`,
          type: 'FILE' as const,
          lastModified: new Date(),
          size: 1024,
        })
      );

      mockUseList.mockReturnValue([
        {
          value: { items: searchItems, nextToken: undefined },
          message: '',
          hasError: false,
          isLoading: false,
        },
        mockHandleList,
      ]);

      const { result } = renderHook(() =>
        useLocationDetailView({ pageSize: EXPECTED_PAGE_SIZE })
      );

      expect(result.current.pageItems).toEqual(
        searchItems.slice(0, EXPECTED_PAGE_SIZE)
      );

      act(() => {
        result.current.onPaginate(2);
      });

      expect(result.current.page).toBe(2);
      expect(result.current.pageItems).toEqual(
        searchItems.slice(EXPECTED_PAGE_SIZE, EXPECTED_PAGE_SIZE * 2)
      );
    });

    it('should expose searchProgress as null initially', () => {
      const { result } = renderHook(() => useLocationDetailView());

      expect(result.current.searchProgress).toBeNull();
    });

    it('should pass onProgress callback when searching', () => {
      mockUseStore.mockReturnValue([mockStoreState, mockStoreDispatch]);
      const mockDataState = {
        value: { items: [], nextToken: undefined },
        message: '',
        hasError: false,
        isLoading: false,
      };
      const localMockHandleList = jest.fn();
      mockUseList.mockReturnValue([mockDataState, localMockHandleList]);

      const { result } = renderHook(() => useLocationDetailView());

      act(() => {
        result.current.onSearchQueryChange('test');
      });

      act(() => {
        result.current.onSearch();
      });

      expect(localMockHandleList).toHaveBeenCalledWith(
        expect.objectContaining({
          options: expect.objectContaining({
            search: expect.objectContaining({
              onProgress: expect.any(Function),
            }),
          }),
        })
      );
    });
  });

  describe('cross-page sorting', () => {
    const mockUseSortConfig = jest.mocked(useSortConfig);

    const sortableItems: LocationItemData[] = [
      folderDataOne,
      {
        ...fileDataOne,
        key: 'some-prefix/charlie.jpg',
        size: 300,
        lastModified: new Date('2024-03-15'),
      },
      {
        ...fileDataTwo,
        key: 'some-prefix/alpha.png',
        size: 1000,
        lastModified: new Date('2024-01-01'),
      },
      {
        ...fileDataThree,
        key: 'some-prefix/beta.doc',
        size: 500,
        lastModified: new Date('2024-06-20'),
      },
    ];

    beforeEach(() => {
      mockUseSortConfig.mockReturnValue({ sortScope: 'all' });
      mockUseList.mockReturnValue([
        {
          value: { items: sortableItems, nextToken: undefined },
          message: '',
          hasError: false,
          isLoading: false,
        },
        mockHandleList,
      ]);
    });

    afterEach(() => {
      mockUseSortConfig.mockReturnValue({ sortScope: 'page' });
    });

    it('should return onSort and sortConfig', () => {
      const { result } = renderHook(() => useLocationDetailView());

      expect(result.current.onSort).toEqual(expect.any(Function));
      expect(result.current.sortConfig).toBeUndefined();
    });

    it('should sort items by name across all pages', () => {
      const { result } = renderHook(() =>
        useLocationDetailView({ pageSize: 2 })
      );

      expect(result.current.pageItems).toHaveLength(2);

      act(() => {
        result.current.onSort!('name');
      });

      expect(result.current.sortConfig).toEqual({
        field: 'name',
        direction: 'ascending',
      });

      // folder first (ascending), then files alphabetically
      const allItems: string[] = [];
      allItems.push(...result.current.pageItems.map((i) => i.id));

      act(() => {
        result.current.onPaginate(2);
      });
      allItems.push(...result.current.pageItems.map((i) => i.id));

      // folder 1 -> file alpha -> file beta -> file charlie
      expect(allItems[0]).toBe('1'); // folderDataOne
    });

    it('should toggle sort direction', () => {
      const { result } = renderHook(() => useLocationDetailView());

      act(() => {
        result.current.onSort!('name');
      });
      expect(result.current.sortConfig?.direction).toBe('ascending');

      act(() => {
        result.current.onSort!('name');
      });
      expect(result.current.sortConfig?.direction).toBe('descending');
    });

    it('should sort by size', () => {
      const { result } = renderHook(() => useLocationDetailView());

      act(() => {
        result.current.onSort!('size');
      });

      expect(result.current.sortConfig).toEqual({
        field: 'size',
        direction: 'ascending',
      });

      // folders first, then files sorted by size ascending
      const fileItems = result.current.pageItems.filter(
        (i) => i.type === 'FILE'
      );
      const sizes = fileItems.map((i) => (i as FileData).size);
      // 300, 500, 1000 ascending
      expect(sizes).toEqual([300, 500, 1000]);
    });

    it('should reset sort on refresh', () => {
      const { result } = renderHook(() => useLocationDetailView());

      act(() => {
        result.current.onSort!('name');
      });
      expect(result.current.sortConfig).toBeDefined();

      act(() => {
        result.current.onRefresh();
      });
      expect(result.current.sortConfig).toBeUndefined();
    });

    it('should reset sort on navigation', () => {
      const { result } = renderHook(() => useLocationDetailView());

      act(() => {
        result.current.onSort!('name');
      });
      expect(result.current.sortConfig).toBeDefined();

      act(() => {
        result.current.onNavigate(testLocation.current!);
      });
      expect(result.current.sortConfig).toBeUndefined();
    });

    it('should work with search results', () => {
      mockUseList.mockReturnValue([
        {
          value: {
            items: sortableItems.filter((i) => i.type === 'FILE'),
            nextToken: undefined,
          },
          message: '',
          hasError: false,
          isLoading: false,
        },
        mockHandleList,
      ]);

      const { result } = renderHook(() => useLocationDetailView());

      act(() => {
        result.current.onSort!('size');
      });

      const fileItems = result.current.pageItems.filter(
        (i) => i.type === 'FILE'
      );
      const sizes = fileItems.map((i) => (i as FileData).size);
      // 300, 500, 1000 ascending
      expect(sizes).toEqual([300, 500, 1000]);
    });
  });

  describe('sortScope option', () => {
    const mockUseSortConfig = jest.mocked(useSortConfig);

    const sortableItems: LocationItemData[] = [
      folderDataOne,
      {
        ...fileDataOne,
        key: 'some-prefix/charlie.jpg',
        size: 300,
        lastModified: new Date('2024-03-15'),
      },
      {
        ...fileDataTwo,
        key: 'some-prefix/alpha.png',
        size: 1000,
        lastModified: new Date('2024-01-01'),
      },
      {
        ...fileDataThree,
        key: 'some-prefix/beta.doc',
        size: 500,
        lastModified: new Date('2024-06-20'),
      },
    ];

    beforeEach(() => {
      mockUseList.mockReturnValue([
        {
          value: { items: sortableItems, nextToken: undefined },
          message: '',
          hasError: false,
          isLoading: false,
        },
        mockHandleList,
      ]);
    });

    afterEach(() => {
      mockUseSortConfig.mockReturnValue({ sortScope: 'page' });
    });

    it('should default to page sort (sortScope "page")', () => {
      const { result } = renderHook(() => useLocationDetailView());

      expect(result.current.onSort).toBeUndefined();
      expect(result.current.sortConfig).toBeUndefined();
    });

    it('should return undefined onSort and sortConfig when sortScope is "page"', () => {
      mockUseSortConfig.mockReturnValue({ sortScope: 'page' });

      const { result } = renderHook(() => useLocationDetailView());

      expect(result.current.onSort).toBeUndefined();
      expect(result.current.sortConfig).toBeUndefined();
    });

    it('should not sort items across pages when sortScope is "page"', () => {
      mockUseSortConfig.mockReturnValue({ sortScope: 'page' });

      const { result } = renderHook(() =>
        useLocationDetailView({ pageSize: 2 })
      );

      // items should come in original order (no cross-page sorting applied)
      const ids = result.current.pageItems.map((i) => i.id);
      expect(ids).toEqual([sortableItems[0].id, sortableItems[1].id]);
    });

    it('should enable cross-page sort when sortScope is "all"', () => {
      mockUseSortConfig.mockReturnValue({ sortScope: 'all' });

      const { result } = renderHook(() => useLocationDetailView());

      expect(result.current.onSort).toEqual(expect.any(Function));
      expect(result.current.sortConfig).toBeUndefined();

      act(() => {
        result.current.onSort!('name');
      });

      expect(result.current.sortConfig).toEqual({
        field: 'name',
        direction: 'ascending',
      });
    });

    it('should sort items across pages when sortScope is "all"', () => {
      mockUseSortConfig.mockReturnValue({ sortScope: 'all' });

      const { result } = renderHook(() =>
        useLocationDetailView({ pageSize: 2 })
      );

      act(() => {
        result.current.onSort!('size');
      });

      expect(result.current.sortConfig).toEqual({
        field: 'size',
        direction: 'ascending',
      });

      // folders first, then smallest file by size
      const firstPageItems = result.current.pageItems;
      expect(firstPageItems).toHaveLength(2);

      // folder comes first, then the smallest file (size 300)
      expect(firstPageItems[0].type).toBe('FOLDER');
      expect((firstPageItems[1] as FileData).size).toBe(300);
    });
  });
});
