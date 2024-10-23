import { renderHook } from '@testing-library/react';

import { useActionType } from '../actionType';
import { useFiles } from '../files';
import { useHistory } from '../history';
import { useLocationItems } from '../locationItems';

import { StoreProvider } from '../StoreProvider';

function useStoreValues() {
  const actionType = useActionType();
  const files = useFiles();
  const history = useHistory();
  const locationItems = useLocationItems();

  return { actionType, files, history, locationItems };
}

describe('StoreProvider', () => {
  it('provides access to the expected context values', () => {
    const { result } = renderHook(() => useStoreValues(), {
      wrapper: StoreProvider,
    });

    const { actionType, files, history, locationItems } = result.current;

    expect(actionType[0]).toBeUndefined();
    expect(typeof actionType[1]).toBe('function');

    expect(files[0]).toStrictEqual([]);
    expect(typeof files[1]).toBe('function');

    expect(history[0]).toStrictEqual({
      current: undefined,
      history: undefined,
    });
    expect(typeof history[1]).toBe('function');

    expect(locationItems[0]).toStrictEqual({ fileDataItems: undefined });
    expect(typeof locationItems[1]).toBe('function');
  });
});
