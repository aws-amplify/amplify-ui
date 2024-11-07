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

    jest.spyOn(AmplifyReactCore, 'useDataState').mockReturnValue([
      {
        data: {
          items: [],
          nextToken: undefined,
        },
        hasError: false,
        isLoading: true,
        message: undefined,
      },
      mockHandleList,
    ]);

    jest.spyOn(Config, 'useGetActionInput').mockReturnValue(() => config);
  });

  it('should return the correct initial state', async () => {
    const { result } = renderHook(() =>
      useDestinationPicker({
        destinationList: ['prefix1'],
      })
    );

    await waitFor(() => {
      expect(result.current).toMatchSnapshot();
    });
  });

  it('should handle search', () => {
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
