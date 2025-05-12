import * as UIReactModule from '@aws-amplify/ui-react/internal';
import { act, renderHook } from '@testing-library/react-hooks';

import { DEFAULT_STATE } from '../constants';
import { FilesProvider, useFiles } from '../context';
import * as filesReducerModule from '../filesReducer';
import * as resolveFilesModule from '../resolveFiles';

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
const resolveFilesSpy = jest.spyOn(resolveFilesModule, 'resolveFiles');
const filesReducerSpy = jest.spyOn(filesReducerModule, 'filesReducer');

describe('useFiles', () => {
  it('returns the expected values', () => {
    const { result } = renderHook(() => useFiles(), { wrapper: FilesProvider });
    const [state, handler] = result.current;

    expect(state).toStrictEqual(DEFAULT_STATE);
    expect(handler).toStrictEqual(expect.any(Function));
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

  it('updates the value of `FilesState` as expected', () => {
    const fileOne = new File([], 'file-one');
    const fileTwo = new File([], 'file-two');
    const fileItemOne = {
      file: fileOne,
      id: expect.any(String),
      key: fileOne.name,
    };
    const fileItemTwo = {
      file: fileTwo,
      id: expect.any(String),
      key: fileTwo.name,
    };
    const mockNextState = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };
    const mockResolveFiles = jest.mocked(resolveFilesModule.resolveFiles);
    const mockFilesDispatch = jest.mocked(filesReducerModule.filesReducer);

    const { result } = renderHook(() => useFiles(), { wrapper: FilesProvider });

    const [initState, handler] = result.current;

    expect(initState).toStrictEqual(DEFAULT_STATE);

    resolveFilesSpy.mockReturnValueOnce({
      valid: [fileOne, fileTwo],
      invalid: undefined,
    });
    filesReducerSpy.mockReturnValueOnce(mockNextState);

    act(() => {
      handler({ type: 'ADD_FILE_ITEMS', files: [fileOne, fileTwo] });
    });

    expect(mockResolveFiles).toHaveBeenCalledTimes(1);
    expect(mockResolveFiles).toHaveBeenCalledWith([fileOne, fileTwo]);

    expect(mockFilesDispatch).toHaveBeenCalledTimes(1);
    expect(mockFilesDispatch).toHaveBeenCalledWith(
      initState,
      expect.objectContaining({
        type: 'ADD_FILE_ITEMS',
        files: [fileOne, fileTwo],
      })
    );

    const [nextState] = result.current;

    const expectedNextState = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };

    expect(nextState).toStrictEqual(expectedNextState);
    expect(nextState).toBe(mockNextState);

    act(() => {
      handler({ type: 'REMOVE_FILE_ITEM', id: fileItemOne.id });
    });

    const [updatedState] = result.current;

    const expectedUpdatedState = {
      items: [fileItemTwo],
      invalidFiles: undefined,
    };

    expect(updatedState).toStrictEqual(expectedUpdatedState);
  });
});
