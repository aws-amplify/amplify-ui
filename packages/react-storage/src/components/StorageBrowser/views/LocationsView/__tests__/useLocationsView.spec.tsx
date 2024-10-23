import React from 'react';
import { renderHook, act } from '@testing-library/react';

import { DataState } from '@aws-amplify/ui-react-core';

import { useLocationsView, DEFAULT_LIST_OPTIONS } from '../useLocationsView';
import { LocationAccess } from '../../../context/types';
import * as ActionsModule from '../../../context/actions';
import * as ControlsModule from '../../../context/control';
import { ListLocationsActionOutput } from '../../../context/actions/listLocationsAction';
import createProvider from '../../../createProvider';

const useLocationsDataSpy = jest.spyOn(ActionsModule, 'useLocationsData');
const useControlSpy = jest.spyOn(ControlsModule, 'useControl');

const config = {
  getLocationCredentials: jest.fn(),
  listLocations: jest.fn(() =>
    Promise.resolve({ locations: [], nextToken: undefined })
  ),
  region: 'region',
  registerAuthListener: jest.fn(),
};
const Provider = createProvider({ actions: {}, config });
const mockData: LocationAccess[] = [
  { scope: 'Location A', type: 'BUCKET', permission: 'READ' },
  { scope: 'Location B', type: 'PREFIX', permission: 'WRITE' },
  { scope: 'Location C', type: 'BUCKET', permission: 'READ' },
  { scope: 'Location D', type: 'PREFIX', permission: 'WRITE' },
  { scope: 'Location E', type: 'BUCKET', permission: 'READ' },
];

const EXPECTED_PAGE_SIZE = 3;

function getWrapper(): React.FC {
  const Wrapper = ({ children }: React.PropsWithChildren<any>) => (
    <Provider> {children} </Provider>
  );
  Wrapper.displayName = 'TestProvider';
  return Wrapper;
}

function mockUseLocationsData(
  returnValue: DataState<ListLocationsActionOutput>
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
      data: { result: mockData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockUseLocationsData(mockDataState);
    const initialState = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result } = renderHook(() => useLocationsView(initialState), {
      wrapper: getWrapper(),
    });

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
    const mockDataState = {
      data: { result: mockData, nextToken: 'token123' },
      message: '',
      hasError: false,
      isLoading: false,
    };
    mockUseLocationsData(mockDataState);

    const initialState = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result } = renderHook(() => useLocationsView(initialState), {
      wrapper: getWrapper(),
    });

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
      data: { result: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockUseLocationsData(mockDataState);

    const { result } = renderHook(() => useLocationsView(), {
      wrapper: getWrapper(),
    });

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
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  });

  it('should handle selecting a location', () => {
    const handleUpdateState = jest.fn();
    useControlSpy.mockReturnValue([{}, handleUpdateState]);

    const { result } = renderHook(() => useLocationsView(), {
      wrapper: getWrapper(),
    });

    const location: LocationAccess = {
      type: 'BUCKET',
      scope: 'Location A',
      permission: 'READ',
    };

    act(() => {
      const state = result.current;
      state.onNavigate(location);
    });

    expect(handleUpdateState).toHaveBeenCalledWith({
      type: 'ACCESS_LOCATION',
      location,
    });
  });
});
