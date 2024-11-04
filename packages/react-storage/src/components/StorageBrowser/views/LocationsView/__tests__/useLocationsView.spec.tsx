import { renderHook, act } from '@testing-library/react';

import { DataState } from '@aws-amplify/ui-react-core';
import * as AmplifyReactCore from '@aws-amplify/ui-react-core';

import { useLocationsView, DEFAULT_LIST_OPTIONS } from '../useLocationsView';
import {
  ActionInputConfig,
  ListLocationsHandlerOutput,
  LocationData,
} from '../../../actions';
import * as ConfigModule from '../../../providers/configuration';
import * as StoreModule from '../../../providers/store';

const dispatchStoreAction = jest.fn();
const testStoreState = {
  location: {
    current: {
      bucket: 'test-bucket',
      prefix: 'item-b/',
      permission: 'READ' as const,
      id: '2',
      type: 'PREFIX' as const,
    },
    path: '',
    key: 'item-b/',
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

const useLocationsDataSpy = jest.spyOn(AmplifyReactCore, 'useDataState');
const useGetActionSpy = jest.spyOn(ConfigModule, 'useGetActionInput');

const config: ActionInputConfig = {
  bucket: 'bucky',
  credentials: jest.fn(),
  region: 'us-weast-1',
};
useGetActionSpy.mockReturnValue(() => config);

const mockData: LocationData[] = [
  {
    bucket: 'test-bucket',
    prefix: `item-a/`,
    permission: 'READWRITE',
    id: '1',
    type: 'PREFIX',
  },
  {
    bucket: 'test-bucket',
    prefix: `item-b/`,
    permission: 'READ',
    id: '2',
    type: 'PREFIX',
  },
  {
    bucket: 'test-bucket',
    prefix: `item-c/`,
    permission: 'READWRITE',
    id: '3',
    type: 'OBJECT',
  },
  {
    bucket: 'test-bucket',
    prefix: `item-d/`,
    permission: 'READWRITE',
    id: '4',
    type: 'PREFIX',
  },
  {
    bucket: 'test-bucket',
    prefix: `item-e/`,
    permission: 'READWRITE',
    id: '5',
    type: 'BUCKET',
  },
];

const EXPECTED_PAGE_SIZE = 3;
function mockUseLocationsData(
  returnValue: DataState<ListLocationsHandlerOutput>
) {
  const handleList = jest.fn();
  useLocationsDataSpy.mockReturnValue([returnValue, handleList]);
  return handleList;
}

describe('useLocationsView', () => {
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

  it('should handle pagination actions', () => {
    const mockDataState = {
      data: { items: mockData, nextToken: 'token123' },
      message: '',
      hasError: false,
      isLoading: false,
    };
    mockUseLocationsData(mockDataState);

    const initialState = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result } = renderHook(() => useLocationsView(initialState));

    // check first page
    expect(result.current.page).toEqual(1);
    expect(result.current.pageItems).toEqual(
      mockData.slice(0, EXPECTED_PAGE_SIZE)
    );

    // go next
    act(() => {
      result.current.onPaginateNext();
    });

    // check next page
    expect(result.current.page).toEqual(2);
    expect(result.current.pageItems).toEqual(
      mockData.slice(EXPECTED_PAGE_SIZE)
    );

    // go back
    act(() => {
      result.current.onPaginatePrevious();
    });

    // check first page
    expect(result.current.page).toEqual(1);
    expect(result.current.pageItems).toEqual(
      mockData.slice(0, EXPECTED_PAGE_SIZE)
    );
  });

  it('should handle refreshing location data', () => {
    const mockDataState = {
      data: { items: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockUseLocationsData(mockDataState);

    const { result } = renderHook(() => useLocationsView());

    // go to second page to verify reset behavior
    act(() => {
      result.current.onPaginateNext();
    });
    expect(result.current.page).toEqual(2);

    act(() => {
      result.current.onRefresh();
    });

    // refresh goes to first page
    expect(result.current.page).toEqual(1);

    // new data fetched
    expect(handleList).toHaveBeenCalledWith({
      config,
      prefix: 'item-b/',
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
});
