import { renderHook, act } from '@testing-library/react';
import { useLocationsView, DEFAULT_LIST_OPTIONS } from '../useLocationsView';
import { useLocationsData } from '../../../context/actions';
import { useControl } from '../../../context/control';
import { usePaginate } from '../../hooks/usePaginate';
import { LocationAccess } from '../../../context/types';
import { DataState } from '@aws-amplify/ui-react-core';

jest.mock('../../../context/actions');
jest.mock('../../../context/control');
jest.mock('../../hooks/usePaginate');

const mockData: LocationAccess[] = [
  { scope: 'Location A', type: 'BUCKET', permission: 'READ' },
  { scope: 'Location B', type: 'PREFIX', permission: 'WRITE' },
  { scope: 'Location C', type: 'BUCKET', permission: 'READ' },
  { scope: 'Location D', type: 'PREFIX', permission: 'WRITE' },
  { scope: 'Location E', type: 'BUCKET', permission: 'READ' },
];
const PAGE_SIZE = 3;

function mockUseLocationsData(
  returnValue: DataState<{ result: LocationAccess[] }>
) {
  const handleList = jest.fn();
  (useLocationsData as jest.Mock).mockReturnValue([returnValue, handleList]);
  return handleList;
}

describe('useLocationsView', () => {
  beforeEach(() => {
    (useControl as jest.Mock).mockReturnValue([{}, jest.fn()]);
    (usePaginate as jest.Mock).mockReturnValue({
      currentPage: 1,
      handlePaginateNext: jest.fn(),
      handlePaginatePrevious: jest.fn(),
      handleReset: jest.fn(),
      range: [0, PAGE_SIZE],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and set location data on mount', () => {
    const mockDataState = {
      data: { result: mockData, nextToken: null },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockUseLocationsData(mockDataState);

    const { result } = renderHook(() => useLocationsView());

    expect(handleList).toHaveBeenCalledWith({
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });

    const [state] = result.current;
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
    expect(state.data.pageItems.length).toEqual(PAGE_SIZE);
  });

  it('should handle pagination actions', () => {
    const handlePaginateNext = jest.fn();
    const handlePaginatePrevious = jest.fn();

    const mockDataState = {
      data: { result: mockData, nextToken: 'token123' },
      message: '',
      hasError: false,
      isLoading: false,
    };
    mockUseLocationsData(mockDataState);

    (usePaginate as jest.Mock).mockReturnValue({
      currentPage: 1,
      handlePaginateNext,
      handlePaginatePrevious,
      handleReset: jest.fn(),
      range: [0, PAGE_SIZE],
    });

    const { result } = renderHook(() => useLocationsView());

    act(() => {
      const [, handleAction] = result.current;
      handleAction({ type: 'PAGINATE_NEXT' });
    });

    expect(handlePaginateNext).toHaveBeenCalledWith({
      resultCount: mockData.length,
      hasNextToken: true,
    });

    act(() => {
      const [, handleAction] = result.current;
      handleAction({ type: 'PAGINATE_PREVIOUS' });
    });

    expect(handlePaginatePrevious).toHaveBeenCalledWith();
  });

  it('should handle refreshing location data', () => {
    const handleReset = jest.fn();
    const mockDataState = {
      data: { result: [], nextToken: null },
      message: '',
      hasError: false,
      isLoading: false,
    };
    const handleList = mockUseLocationsData(mockDataState);

    (usePaginate as jest.Mock).mockReturnValue({
      currentPage: 1,
      handlePaginateNext: jest.fn(),
      handlePaginatePrevious: jest.fn(),
      handleReset,
      range: [0, PAGE_SIZE],
    });

    const { result } = renderHook(() => useLocationsView());

    act(() => {
      const [, handleAction] = result.current;
      handleAction({ type: 'REFRESH' });
    });

    expect(handleReset).toHaveBeenCalled();
    expect(handleList).toHaveBeenCalledWith({
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  });

  it('should handle selecting a location', () => {
    const handleUpdateState = jest.fn();
    (useControl as jest.Mock).mockReturnValue([{}, handleUpdateState]);

    const { result } = renderHook(() => useLocationsView());

    const location: LocationAccess = {
      type: 'BUCKET',
      scope: 'Location A',
      permission: 'READ',
    }; // Example location object

    act(() => {
      const [, handleAction] = result.current;
      handleAction({ type: 'SELECT_LOCATION', location });
    });

    expect(handleUpdateState).toHaveBeenCalledWith({
      type: 'ACCESS_LOCATION',
      location,
    });
  });

  it('should return paginated items based on current page and page size', () => {
    const mockDataState = {
      data: { result: mockData, nextToken: null },
      message: '',
      hasError: false,
      isLoading: false,
    };
    mockUseLocationsData(mockDataState);
    const { result } = renderHook(() => useLocationsView());
    const [state] = result.current;
    expect(state.data.pageItems).toEqual(mockData.slice(0, PAGE_SIZE));
  });
});
