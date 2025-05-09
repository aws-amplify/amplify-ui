import * as UIReactModule from '@aws-amplify/ui-react/internal';
import { act, renderHook } from '@testing-library/react-hooks';

import { DEFAULT_STATE } from '../constants';
import { FilesProvider, useFiles } from '../context';

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

    expect(state).toStrictEqual(DEFAULT_STATE);
    expect(typeof handler).toBe('function');
  });

  it('returned `handler` calls `handleFileSelect` when selecting files as expected', () => {
    const handleFileSelect = jest.fn();

    useFileSelectSpy.mockReturnValue([[], handleFileSelect]);

    const { result } = renderHook(() => useFiles(), { wrapper: FilesProvider });
    const handler = result.current[1];

    act(() => {
      handler({ type: 'SELECT_FILES' });
    });

    expect(handleFileSelect).toHaveBeenCalledTimes(1);
  });

  it('adds valid files as expected', () => {
    const fileOne = new File([], 'file-one');
    const fileTwo = new File([], 'file-two');

    const { result } = renderHook(() => useFiles(), { wrapper: FilesProvider });

    const [initState, handler] = result.current;

    expect(initState).toStrictEqual(DEFAULT_STATE);

    act(() => {
      handler({ type: 'ADD_FILE_ITEMS', files: [fileOne, fileTwo] });
    });

    const [nextState] = result.current;

    expect(nextState.items).toHaveLength(2);
    expect(nextState.invalidFiles).toBeUndefined();
  });
});
