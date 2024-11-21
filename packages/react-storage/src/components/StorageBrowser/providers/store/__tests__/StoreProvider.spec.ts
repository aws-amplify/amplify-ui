import { renderHook } from '@testing-library/react';

import { useActionType } from '../actionType';
import { useFiles } from '../files';
import { useLocation } from '../location';
import { useLocationItems } from '../locationItems';

import { StoreProvider } from '../StoreProvider';

function useStoreValues() {
  const actionType = useActionType();
  const files = useFiles();
  const location = useLocation();
  const locationItems = useLocationItems();

  return { actionType, files, location, locationItems };
}

describe('StoreProvider', () => {
  it('provides access to the expected context values', () => {
    const { result } = renderHook(() => useStoreValues(), {
      wrapper: StoreProvider,
    });

    const { actionType, files, location, locationItems } = result.current;

    expect(actionType[0]).toBeUndefined();
    expect(typeof actionType[1]).toBe('function');

    expect(files[0]).toStrictEqual([]);
    expect(typeof files[1]).toBe('function');

    expect(location[0]).toStrictEqual({
      current: undefined,
      path: '',
      key: '',
    });
    expect(typeof location[1]).toBe('function');

    expect(locationItems[0]).toStrictEqual({ fileDataItems: undefined });
    expect(typeof locationItems[1]).toBe('function');
  });
});
