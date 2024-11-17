import { act, renderHook, waitFor } from '@testing-library/react';

import * as AmplifyReactCore from '@aws-amplify/ui-react-core';

import { LocationData } from '../../../../actions';
import * as Store from '../../../../providers/store';
import * as Config from '../../../../providers/configuration';
import { DEFAULT_LIST_OPTIONS, useFolders } from '../useFolders';
import { LocationState } from '../../../../providers/store/location';

const mockDispatchStoreAction = jest.fn();
const mockHandleList = jest.fn();
const config = {
  accountId: '123456789012',
  bucket: 'bucket',
  credentials: jest.fn(),
  region: 'us-west-2',
};

jest.useFakeTimers();
jest.setSystemTime(1731366223230);

const mockItems = [
  {
    key: 'prefix1/',
    lastModified: new Date(),
    id: 'id',
    size: 10,
    type: 'FOLDER',
  },
  {
    key: 'prefix2/',
    lastModified: new Date(),
    id: 'id',
    size: 10,
    type: 'FOLDER',
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

  const mockSetDestination = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(Store, 'useStore').mockReturnValue([
      {
        actionType: 'COPY',
        files: [],
        location,
        locationItems: {
          fileDataItems: [
            {
              key: 'prefixer/test-file.txt',
              fileKey: 'test-file.txt',
              lastModified: new Date(),
              id: 'id',
              size: 10,
              type: 'FILE',
            },
          ],
        },
      },
      mockDispatchStoreAction,
    ]);

    jest.spyOn(Config, 'useGetActionInput').mockReturnValue(() => config);
  });

  it('should return the correct initial state', async () => {
    jest.spyOn(AmplifyReactCore, 'useDataState').mockReturnValueOnce([
      {
        data: {
          items: mockItems,
          nextToken: 'token',
        },
        hasError: false,
        isLoading: false,
        message: undefined,
      },
      mockHandleList,
    ]);

    const { result } = renderHook(() =>
      useFolders({ destination: location, setDestination: mockSetDestination })
    );

    await waitFor(() => {
      expect(result.current).toMatchSnapshot();
    });
  });

  it('should update the reference of onInitialize on destination change', () => {
    jest.spyOn(AmplifyReactCore, 'useDataState').mockReturnValue([
      {
        data: {
          items: mockItems,
          nextToken: 'token',
        },
        hasError: false,
        isLoading: false,
        message: undefined,
      },
      mockHandleList,
    ]);

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
    jest.spyOn(AmplifyReactCore, 'useDataState').mockReturnValueOnce([
      {
        data: {
          items: mockItems,
          nextToken: 'token',
        },
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
      result.current.onQuery('moo');
    });

    act(() => {
      result.current.onSearch();
    });

    expect(mockHandleList).toHaveBeenCalledWith({
      config,
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

  it('should handle paginate', () => {
    const nextToken = 'token';
    jest.spyOn(AmplifyReactCore, 'useDataState').mockReturnValue([
      {
        data: {
          items: mockItems,
          nextToken,
        },
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
      config,
      options: {
        ...DEFAULT_LIST_OPTIONS,
        exclude: 'FILE',
        nextToken,
      },
      prefix: 'prefix1/',
    });
  });
});
