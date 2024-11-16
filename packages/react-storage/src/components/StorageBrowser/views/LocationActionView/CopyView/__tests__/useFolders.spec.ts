import { act, renderHook, waitFor } from '@testing-library/react';

import * as AmplifyReactCore from '@aws-amplify/ui-react-core';

import { LocationData } from '../../../../actions';
import * as Store from '../../../../providers/store';
import * as Config from '../../../../providers/configuration';
import { DEFAULT_LIST_OPTIONS, useFolders } from '../useFolders';

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
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(Store, 'useStore').mockReturnValue([
      {
        actionType: 'COPY',
        files: [],
        location: {
          current: {
            prefix: 'test-prefix/',
            bucket: 'bucket',
            id: 'id',
            permissions: ['get', 'list'],
            type: 'PREFIX',
          } as LocationData,
          path: '',
          key: 'test-prefix/',
        },
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
      useFolders({
        destinationList: ['prefix1'],
      })
    );

    await waitFor(() => {
      expect(result.current).toMatchSnapshot();
    });
  });

  it('should update the reference of onInitialize on destinationList change', () => {
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
        props: { destinationList: string[] } = {
          destinationList: ['prefix1'],
        }
      ) => useFolders(props)
    );
    const initial = result.current.onInitialize;

    rerender({
      destinationList: ['prefix1', 'subfolder1'],
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
      useFolders({
        destinationList: ['prefix1'],
      })
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
      useFolders({ destinationList: ['prefix1'] })
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
