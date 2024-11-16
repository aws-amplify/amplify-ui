import { act, renderHook } from '@testing-library/react';
import { FilesProvider, useFiles } from '../context';

import * as UIReactModule from '@aws-amplify/ui-react/internal';
import { UPLOAD_FILE_SIZE_LIMIT } from '../../../../views/LocationActionView/constants';

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

describe('useFiles', () => {
  it('returns the expected values', () => {
    const { result } = renderHook(() => useFiles(), { wrapper: FilesProvider });
    const [state, handler] = result.current;

    expect(state).toStrictEqual({ validFiles: [], invalidFiles: [] });
    expect(typeof handler).toBe('function');
  });

  it('returned `handler` calls `handleFileSelect` as expected', () => {
    const handleFileSelect = jest.fn();

    useFileSelectSpy.mockReturnValue([[], handleFileSelect]);

    const { result } = renderHook(() => useFiles(), { wrapper: FilesProvider });
    const handler = result.current[1];

    act(() => {
      handler({ type: 'SELECT_FILES' });
    });

    expect(handleFileSelect).toHaveBeenCalledTimes(1);
  });

  it('adds files as expected', () => {
    const fileOne = new File([], 'file-one');
    const fileTwo = new File([], 'file-two');
    const invalidFileThree = {
      ...new File([], 'file-three-invalid'),
      size: UPLOAD_FILE_SIZE_LIMIT + 1,
    };

    const { result } = renderHook(() => useFiles(), { wrapper: FilesProvider });

    const [initState, handler] = result.current;

    expect(initState).toStrictEqual({ validFiles: [], invalidFiles: [] });

    act(() => {
      handler({
        type: 'ADD_FILE_ITEMS',
        files: [fileOne, fileTwo, invalidFileThree],
      });
    });

    const [nextState] = result.current;

    expect(nextState?.validFiles).toHaveLength(2);
    expect(nextState?.invalidFiles).toHaveLength(1);
  });
});
