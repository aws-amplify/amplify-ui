import { renderHook, act } from '@testing-library/react';

import { DataState } from '@aws-amplify/ui-react-core';

import {
  useLocationDetailView,
  DEFAULT_LIST_OPTIONS,
} from '../useLocationDetailView';
import { LocationData, LocationItemData } from '../../../actions';
import { ListLocationItemsActionOutput } from '../../../do-not-import-from-here/actions/listLocationItemsAction';
import * as ActionsModule from '../../../do-not-import-from-here/actions';
import * as StoreModule from '../../../providers/store';
import { HistoryState } from '../../../providers/store/history';

// fake date for mock data below
jest.useFakeTimers({ now: Date.UTC(2024, 0, 1) });
const mockData: LocationItemData[] = [
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

function mockListItemsAction(
  returnValue: DataState<ListLocationItemsActionOutput>
) {
  const handleList = jest.fn();
  jest
    .spyOn(ActionsModule, 'useAction')
    .mockReturnValue([returnValue, handleList]);
  return handleList;
}

const mockHistory: HistoryState = {
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

function mockUseStore(returnValue?: Partial<StoreModule.UseStoreState>) {
  const dispatchStoreAction = jest.fn();
  jest.spyOn(StoreModule, 'useStore').mockReturnValue([
    {
      history: returnValue?.history ?? mockHistory,
      files: [],
      locationItems: {
        fileDataItems: undefined,
      },
      actionType: undefined,
    },
    dispatchStoreAction,
  ]);
  return dispatchStoreAction;
}

describe('useLocationsView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and set location data on mount', () => {
    mockUseStore();
    const mockDataState = {
      data: { result: mockData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockListItemsAction(mockDataState);

    const initialState = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result } = renderHook(() => useLocationDetailView(initialState));

    // fetches data
    expect(handleList).toHaveBeenCalledWith({
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
    mockUseStore({ history: { current: undefined, previous: undefined } });

    const mockDataState = {
      data: { result: mockData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockListItemsAction(mockDataState);

    renderHook(() =>
      useLocationDetailView({
        initialValues: { pageSize: EXPECTED_PAGE_SIZE },
      })
    );

    expect(handleList).not.toHaveBeenCalled();
  });

  it('should handle pagination actions', () => {
    const mockDataState = {
      data: { result: mockData, nextToken: 'token123' },
      message: '',
      hasError: false,
      isLoading: false,
    };
    mockListItemsAction(mockDataState);
    const initialValues = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result } = renderHook(() => useLocationDetailView(initialValues));
    // go next
    act(() => {
      result.current.onPaginateNext();
    });

    // check if data is correct
    expect(result.current.page).toEqual(2);
    expect(result.current.pageItems).toEqual(mockData.slice(3));

    // go previous
    act(() => {
      result.current.onPaginatePrevious();
    });

    // check data
    expect(result.current.page).toEqual(1);
    expect(result.current.pageItems).toEqual(mockData.slice(0, 3));
  });

  it('should handle refreshing location data', () => {
    mockUseStore();
    const mockDataState = {
      data: { result: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockListItemsAction(mockDataState);

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
    expect(handleList).toHaveBeenCalledWith({
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
      prefix: 'item-b/',
    });
  });

  it('should not refresh location data for invalid paths', () => {
    mockUseStore({ history: { current: undefined, previous: undefined } });

    const mockDataState = {
      data: { result: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockListItemsAction(mockDataState);

    const { result } = renderHook(() => useLocationDetailView());

    act(() => {
      result.current.onRefresh();
    });
    expect(result.current.page).toEqual(1);
    expect(handleList).not.toHaveBeenCalled();
  });

  it('should handle selecting a location', () => {
    const dispatch = mockUseStore({} as StoreModule.UseStoreState);

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

    expect(dispatch).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      destination: expectedLocation,
    });
  });

  it('should handle adding files', () => {
    const dispatchMock = mockUseStore();
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
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'ADD_FILE_ITEMS',
      files: mockFiles,
    });
  });
});
