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
  afterEach(() => {
    jest.clearAllMocks();
  });

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
      id: 'item-one',
      key: fileOne.name,
    };
    const fileItemTwo = {
      file: fileTwo,
      id: 'item-two',
      key: fileTwo.name,
    };
    const mockNextState = {
      items: [fileItemOne, fileItemTwo],
      invalidItems: undefined,
    };
    filesReducerSpy.mockReturnValueOnce(mockNextState);

    const { result } = renderHook(() => useFiles(), { wrapper: FilesProvider });

    const [initState, handler] = result.current;

    expect(initState).toStrictEqual(DEFAULT_STATE);

    act(() => {
      handler({ type: 'ADD_FILE_ITEMS', files: [fileOne, fileTwo] });
    });

    expect(resolveFilesSpy).toHaveBeenCalledTimes(1);
    expect(resolveFilesSpy).toHaveBeenCalledWith([fileOne, fileTwo]);
    expect(resolveFilesSpy).toHaveReturnedWith({
      valid: [fileOne, fileTwo],
      invalid: undefined,
    });

    expect(filesReducerSpy).toHaveBeenCalledTimes(1);
    expect(filesReducerSpy).toHaveBeenCalledWith(initState, {
      type: 'ADD_FILE_ITEMS',
      files: [fileOne, fileTwo],
    });
    expect(filesReducerSpy).toHaveReturnedWith(mockNextState);

    act(() => {
      handler({ type: 'REMOVE_FILE_ITEM', id: fileItemOne.id });
    });

    expect(filesReducerSpy).toHaveBeenCalledTimes(2);
    expect(filesReducerSpy).toHaveBeenLastCalledWith(mockNextState, {
      type: 'REMOVE_FILE_ITEM',
      id: fileItemOne.id,
    });
    expect(filesReducerSpy).toHaveLastReturnedWith({
      items: [fileItemTwo],
      invalidItems: undefined,
    });
  });
});
