import { act, renderHook, waitFor } from '@testing-library/react';

import * as AmplifyReactCore from '@aws-amplify/ui-react-core';

import * as Store from '../../../../providers/store';
import * as Config from '../../../../providers/configuration';
import {
  DEFAULT_LIST_OPTIONS,
  useDestinationPicker,
} from '../useDestinationPicker';

const mockDispatchStoreAction = jest.fn();
const mockHandleList = jest.fn();
const config = {
  accountId: '123456789012',
  bucket: 'bucket',
  credentials: jest.fn(),
  region: 'us-west-2',
};

const mockItems = [
  {
    key: 'prefix1/',
    lastModified: '2024-11-11T20:36:56.436Z',
    id: 'id',
    size: 10,
    type: 'FOLDER',
  },
  {
    key: 'prefix2/',
    lastModified: '2024-11-11T20:36:56.436Z',
    id: 'id',
    size: 10,
    type: 'FOLDER',
  },
];

describe('useDestinationPicker', () => {
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
            permission: 'READWRITE',
            type: 'PREFIX',
          },
          path: '',
          key: 'test-prefix/',
        },
        locationItems: {
          fileDataItems: [
            {
              key: 'prefixer/test-file.txt',
              fileKey: 'test-file.txt',
              lastModified: '2024-11-11T20:36:56.436Z' as unknown as Date,
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
      useDestinationPicker({
        destinationList: ['prefix1'],
      })
    );

    await waitFor(() => {
      expect(result.current).toMatchSnapshot();
    });
  });

  it('should call handleList once per destinationList change', async () => {
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

    const { rerender } = renderHook(
      (
        props: { destinationList: string[] } = {
          destinationList: ['prefix1'],
        }
      ) => useDestinationPicker(props)
    );
    await waitFor(() => {
      rerender({
        destinationList: ['prefix1', 'subfolder1'],
      });
      rerender({
        destinationList: ['prefix1'],
      });
      rerender({
        destinationList: ['prefix1'],
      });
      expect(mockHandleList).toHaveBeenCalledTimes(3);
    });
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
      useDestinationPicker({
        destinationList: ['prefix1'],
      })
    );

    act(() => {
      const state = result.current;
      state.onSearch('moo');
    });

    expect(mockHandleList).toHaveBeenCalledWith({
      config,
      options: {
        ...DEFAULT_LIST_OPTIONS,
        exclude: 'FILE',
        search: { filterKey: 'key', query: 'moo' },
      },
      prefix: 'prefix1/',
    });
  });
});
