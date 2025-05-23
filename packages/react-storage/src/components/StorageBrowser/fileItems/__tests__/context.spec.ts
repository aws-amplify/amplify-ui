import * as UIReactModule from '@aws-amplify/ui-react/internal';
import { act, renderHook } from '@testing-library/react';

import { DEFAULT_STATE } from '../constants';
import { fileItemsReducer } from '../fileItemsReducer';
import { resolveFiles } from '../utils';

import { FileItemsProvider, useFileItems } from '../context';

jest.mock('../fileItemsReducer');
jest.mock('../utils', () => ({
  ...jest.requireActual<typeof import('../utils')>('../utils'),
  resolveFiles: jest.fn(),
}));

let uuid = 0;
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => {
      uuid++;
      return uuid.toString();
    },
  },
});

const useFileSelectSpy = jest.spyOn(UIReactModule, 'useFileSelect');

describe('useFileItems', () => {
  const mockResolveFiles = jest.mocked(resolveFiles);
  const mockFileItemsReducer = jest.mocked(fileItemsReducer);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns the expected values', () => {
    const { result } = renderHook(() => useFileItems(), {
      wrapper: FileItemsProvider,
    });
    const [state, handler] = result.current;

    expect(state).toBe(DEFAULT_STATE);
    expect(handler).toStrictEqual(expect.any(Function));
  });

  it('returned `handler` calls `handleFileSelect` when selecting files as expected', () => {
    const handleFileSelect = jest.fn();

    useFileSelectSpy.mockReturnValue([[], handleFileSelect]);

    const { result } = renderHook(() => useFileItems(), {
      wrapper: FileItemsProvider,
    });
    const handler = result.current[1];

    act(() => {
      handler({ type: 'SELECT_FILES' });
    });

    expect(handleFileSelect).toHaveBeenCalledTimes(1);
  });

  it('updates the value of `FileItemsState` as expected', () => {
    const fileOne = new File([], 'file-one');
    const fileTwo = new File([], 'file-two');
    const fileItemOne = {
      file: fileOne,
      id: 'item-one',
      key: fileOne.name,
    };
    const fileItemTwo = {
      file: fileTwo,
      id: 'item-two',
      key: fileTwo.name,
    };

    mockResolveFiles.mockReturnValueOnce({
      validFiles: [fileOne, fileTwo],
      invalidFiles: undefined,
    });
    mockFileItemsReducer.mockReturnValueOnce({
      validItems: [fileItemOne, fileItemTwo],
      invalidItems: undefined,
    });

    const { result } = renderHook(() => useFileItems(), {
      wrapper: FileItemsProvider,
    });

    const [initState, handler] = result.current;

    expect(initState).toBe(DEFAULT_STATE);

    act(() => {
      handler({ type: 'ADD_FILES', files: [fileOne, fileTwo] });
    });

    expect(mockResolveFiles).toHaveBeenCalledTimes(1);
    expect(mockResolveFiles).toHaveBeenCalledWith(
      [fileOne, fileTwo],
      undefined
    );

    expect(mockFileItemsReducer).toHaveBeenCalledTimes(1);
    expect(mockFileItemsReducer).toHaveBeenCalledWith(initState, {
      type: 'ADD_FILE_ITEMS',
      validFiles: [fileOne, fileTwo],
      invalidFiles: undefined,
    });

    const [nextState] = result.current;

    act(() => {
      handler({ type: 'REMOVE_FILE_ITEM', id: fileItemOne.id });
    });

    expect(mockFileItemsReducer).toHaveBeenCalledTimes(2);
    expect(mockFileItemsReducer).toHaveBeenLastCalledWith(nextState, {
      type: 'REMOVE_FILE_ITEM',
      id: fileItemOne.id,
    });
  });
});
