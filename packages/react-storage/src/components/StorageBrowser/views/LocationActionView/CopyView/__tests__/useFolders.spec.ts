import { act, renderHook, waitFor } from '@testing-library/react';

import { LocationData } from '../../../../actions';
import { LocationState } from '../../../../store';
import { useList } from '../../../../useAction';
import { DEFAULT_LIST_OPTIONS, useFolders } from '../useFolders';

jest.mock('../../../../useAction');
jest.mock('../../../../store');
jest.useFakeTimers();
jest.setSystemTime(1731366223230);

const mockItems = [
  {
    key: 'prefix1/',
    lastModified: new Date(),
    id: 'id',
    size: 10,
    type: 'FOLDER' as const,
  },
  {
    key: 'prefix2/',
    lastModified: new Date(),
    id: 'id',
    size: 10,
    type: 'FOLDER' as const,
  },
];

describe('useFolders', () => {
  const location = {
    current: {
      prefix: 'prefix1/',
      bucket: 'bucket',
      id: 'id',
      permissions: ['get', 'list'],
      type: 'PREFIX',
    } as LocationData,
    path: '',
    key: 'prefix1/',
  };

  const mockUseList = jest.mocked(useList);

  const mockHandleList = jest.fn();
  const mockSetDestination = jest.fn();

  beforeEach(() => {
    mockUseList.mockReturnValue([
      {
        data: { items: mockItems, nextToken: 'token' },
        hasError: false,
        isLoading: false,
        message: undefined,
      },
      mockHandleList,
    ]);
  });

  afterEach(jest.clearAllMocks);

  it('should return the correct initial state', async () => {
    const { result } = renderHook(() =>
      useFolders({ destination: location, setDestination: mockSetDestination })
    );

    await waitFor(() => {
      expect(result.current).toMatchSnapshot();
    });
  });

  it('calls handleList from onInitialize', () => {
    const { result } = renderHook(() =>
      useFolders({ destination: location, setDestination: mockSetDestination })
    );

    const { onInitialize } = result.current;

    act(() => {
      onInitialize();
    });

    expect(mockHandleList).toHaveBeenCalledTimes(1);
    expect(mockHandleList).toHaveBeenCalledWith({
      options: {
        delimiter: '/',
        exclude: 'FILE',
        pageSize: 100,
        refresh: true,
      },
      prefix: 'prefix1/',
    });
  });

  it('should update the reference of onInitialize on destination change', () => {
    const { rerender, result } = renderHook(
      (
        props: { destination: LocationState; setDestination: () => void } = {
          destination: location,
          setDestination: mockSetDestination,
        }
      ) => useFolders(props)
    );
    const initial = result.current.onInitialize;

    rerender({
      destination: {
        ...location,
        current: { ...location.current },
        path: 'subfolder1/',
        key: `${location.current.prefix}subfolder1/`,
      },
      setDestination: mockSetDestination,
    });

    const next = result.current.onInitialize;

    expect(next).not.toBe(initial);
  });

  it('should handle search', () => {
    const { result } = renderHook(() =>
      useFolders({ destination: location, setDestination: mockSetDestination })
    );

    act(() => {
      result.current.onQuery('moo');
    });

    act(() => {
      result.current.onSearch();
    });

    expect(mockHandleList).toHaveBeenCalledWith({
      options: {
        ...DEFAULT_LIST_OPTIONS,
        exclude: 'FILE',
        search: { filterBy: 'key', query: 'moo' },
      },
      prefix: 'prefix1/',
    });

    // clearing search refreshes the list
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

  it('should reset search on selecting folder', () => {
    const { result } = renderHook(() =>
      useFolders({ destination: location, setDestination: mockSetDestination })
    );

    act(() => {
      result.current.onQuery('boo');
    });

    expect(result.current.query).toBe('boo');

    act(() => {
      result.current.onSelectFolder('random-id', 'some-path');
    });

    expect(result.current.query).toBe('');
  });

  it('should handle paginate', () => {
    const nextToken = 'token';
    mockUseList.mockReturnValue([
      {
        data: { items: mockItems, nextToken },
        hasError: false,
        isLoading: false,
        message: undefined,
      },
      mockHandleList,
    ]);

    const { result } = renderHook(() =>
      useFolders({ destination: location, setDestination: mockSetDestination })
    );

    act(() => {
      const state = result.current;
      state.onPaginate(2);
    });

    expect(mockHandleList).toHaveBeenCalledWith({
      options: { ...DEFAULT_LIST_OPTIONS, exclude: 'FILE', nextToken },
      prefix: 'prefix1/',
    });
  });

  it('does not call `setDestination` from `onSelectFolder` when `current` is `undefined`', () => {
    const { result } = renderHook(() =>
      useFolders({
        destination: { ...location, current: undefined },
        setDestination: mockSetDestination,
      })
    );

    const { onSelectFolder } = result.current;

    act(() => {
      onSelectFolder('some-id', 'some-path');
    });

    expect(mockSetDestination).not.toHaveBeenCalled();
  });

  it('does not call `handleList` from `onPaginate` when `nextToken` is `undefined', () => {
    mockUseList.mockReturnValue([
      {
        data: { items: mockItems, nextToken: undefined },
        hasError: false,
        isLoading: false,
        message: undefined,
      },
      mockHandleList,
    ]);

    const { result } = renderHook(() =>
      useFolders({ destination: location, setDestination: mockSetDestination })
    );

    const { onPaginate } = result.current;

    act(() => {
      onPaginate(2);
    });

    expect(mockHandleList).not.toHaveBeenCalled();
  });
});
