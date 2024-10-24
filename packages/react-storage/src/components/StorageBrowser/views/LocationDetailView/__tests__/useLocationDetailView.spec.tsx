import React from 'react';
import { renderHook, act } from '@testing-library/react';

import { DataState } from '@aws-amplify/ui-react-core';

import {
  useLocationDetailView,
  DEFAULT_LIST_OPTIONS,
} from '../useLocationDetailView';
import { LocationItem } from '../../../context/types';
import * as ActionsModule from '../../../context/actions';
import * as ControlsModule from '../../../context/control';
import createProvider from '../../../createProvider';
import { ListLocationItemsActionOutput } from '../../../context/actions/listLocationItemsAction';
import { LocationActionsState } from '../../../context/locationActions';
import { NavigateState } from '../../../context/navigate/Navigate';

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

// fake date for mock data below
jest.useFakeTimers({ now: Date.UTC(2024, 0, 1) });
const mockData: LocationItem[] = [
  { key: 'Location A', type: 'FOLDER' },
  { key: 'Location B', type: 'FILE', lastModified: new Date(), size: 25600 },
  { key: 'Location C', type: 'FILE', lastModified: new Date(), size: 12800 },
  { key: 'Location D', type: 'FILE', lastModified: new Date(), size: 12800 },
  { key: 'Location E', type: 'FILE', lastModified: new Date(), size: 25600 },
];

const EXPECTED_PAGE_SIZE = 3;

function getWrapper(): React.FC {
  const Wrapper = ({ children }: React.PropsWithChildren<any>) => (
    <Provider> {children} </Provider>
  );
  Wrapper.displayName = 'TestProvider';
  return Wrapper;
}

function mockListItemsAction(
  returnValue: DataState<ListLocationItemsActionOutput>
) {
  const handleList = jest.fn();
  jest
    .spyOn(ActionsModule, 'useAction')
    .mockReturnValue([returnValue, handleList]);
  return handleList;
}

function mockUseControl(options?: {
  navigationReturnValue?: NavigateState;
  locationReturnValue?: LocationActionsState;
}) {
  const navigateSpy = jest.fn();
  const navigationState = [
    options?.navigationReturnValue ?? {
      location: undefined,
      history: [],
      path: '',
    },
    navigateSpy,
  ];

  const locationActionsSpy = jest.fn();
  const locationActionState = [
    options?.locationReturnValue ?? {
      selected: { type: undefined, items: undefined },
      actions: {},
    },
    locationActionsSpy,
  ];
  useControlSpy.mockImplementation(
    (type) =>
      ({
        LOCATION_ACTIONS: locationActionState,
        NAVIGATE: navigationState,
      })[type]
  );

  return {
    handleNavigate: navigateSpy,
    handleLocationActions: locationActionsSpy,
  };
}

describe('useLocationsView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and set location data on mount', () => {
    mockUseControl();
    const mockDataState = {
      data: { result: mockData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockListItemsAction(mockDataState);

    const initialState = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result } = renderHook(() => useLocationDetailView(initialState), {
      wrapper: getWrapper(),
    });

    // fetches data
    expect(handleList).toHaveBeenCalledWith({
      options: {
        ...DEFAULT_LIST_OPTIONS,
        refresh: true,
        pageSize: EXPECTED_PAGE_SIZE,
      },
      prefix: '',
    });

    const state = result.current;
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
    expect(state.pageItems.length).toEqual(EXPECTED_PAGE_SIZE);
  });

  it('should not fetch on mount for invalid path', () => {
    mockUseControl({
      navigationReturnValue: {
        location: undefined,
        history: [],
        path: undefined,
      },
    });
    const mockDataState = {
      data: { result: mockData, nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockListItemsAction(mockDataState);

    renderHook(
      () =>
        useLocationDetailView({
          initialValues: { pageSize: EXPECTED_PAGE_SIZE },
        }),
      { wrapper: getWrapper() }
    );

    expect(handleList).not.toHaveBeenCalled();
  });

  it('should handle pagination actions', () => {
    mockUseControl();
    const mockDataState = {
      data: { result: mockData, nextToken: 'token123' },
      message: '',
      hasError: false,
      isLoading: false,
    };
    mockListItemsAction(mockDataState);
    const initialValues = { initialValues: { pageSize: EXPECTED_PAGE_SIZE } };
    const { result } = renderHook(() => useLocationDetailView(initialValues), {
      wrapper: getWrapper(),
    });
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

  it('should not paginate for invalid paths', () => {
    mockUseControl({
      navigationReturnValue: {
        location: undefined,
        history: [],
        path: undefined,
      },
    });
    const mockDataState = {
      data: { result: mockData, nextToken: 'token123' },
      message: '',
      hasError: false,
      isLoading: false,
    };
    mockListItemsAction(mockDataState);

    const { result } = renderHook(() => useLocationDetailView(), {
      wrapper: getWrapper(),
    });

    act(() => {
      result.current.onPaginateNext();
    });

    // page number unchanged
    expect(result.current.page).toEqual(1);

    act(() => {
      result.current.onPaginatePrevious();
    });

    // page number unchanged
    expect(result.current.page).toEqual(1);
  });

  it('should handle refreshing location data', () => {
    const mockDataState = {
      data: { result: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    mockUseControl();
    const handleList = mockListItemsAction(mockDataState);

    const { result } = renderHook(() => useLocationDetailView(), {
      wrapper: getWrapper(),
    });

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
      prefix: '',
    });
  });

  it('should not refresh location data for invalid paths', () => {
    const mockDataState = {
      data: { result: [], nextToken: undefined },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockListItemsAction(mockDataState);
    mockUseControl({
      navigationReturnValue: {
        location: undefined,
        history: [],
        path: undefined,
      },
    });

    const { result } = renderHook(() => useLocationDetailView(), {
      wrapper: getWrapper(),
    });

    act(() => {
      result.current.onRefresh();
    });
    expect(result.current.page).toEqual(1);
    expect(handleList).not.toHaveBeenCalled();
  });

  it('should handle selecting a location', () => {
    const { handleNavigate } = mockUseControl();

    const { result } = renderHook(() => useLocationDetailView(), {
      wrapper: getWrapper(),
    });

    const expectedKey = 'some-bucket';

    act(() => {
      const state = result.current;
      state.onAccessItem(expectedKey);
    });

    expect(handleNavigate).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      entry: { prefix: expectedKey, position: 1 },
    });
  });

  it('should handle adding files', () => {
    const { handleLocationActions } = mockUseControl();

    const { result } = renderHook(() => useLocationDetailView(), {
      wrapper: getWrapper(),
    });

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
    expect(handleLocationActions).toHaveBeenCalledWith({
      actionType: 'UPLOAD_FILES',
      type: 'SET_ACTION',
      files: mockFiles,
    });

    handleLocationActions.mockClear();

    // uploads folders
    const folder = new File(mockFiles, 'folder');
    const mockFolder = [folder];
    act(() => {
      const state = result.current;
      state.onAddFiles(mockFolder);
    });

    expect(handleLocationActions).toHaveBeenCalledWith({
      actionType: 'UPLOAD_FOLDER',
      type: 'SET_ACTION',
      files: mockFolder,
    });
  });
});
