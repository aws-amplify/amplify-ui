import { renderHook, waitFor } from '@testing-library/react';

import * as Store from '../../../../providers/store';
import * as Config from '../../../../providers/configuration';
import * as ListLocationItems from '../../../../actions/handlers/listLocationItems';
import { useDestinationPicker } from '../useDestinationPicker';

const mockDispatchStoreAction = jest.fn();

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
              key: 'test-file.txt',
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

    jest.spyOn(ListLocationItems, 'listLocationItemsHandler').mockReturnValue(
      Promise.resolve({
        items: [],
        nextToken: 'token',
      })
    );

    jest.spyOn(Config, 'useGetActionInput').mockReturnValue(() => ({
      accountId: '123456789012',
      bucket: 'bucket',
      credentials: jest.fn(),
      region: 'us-west-2',
    }));
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
});
