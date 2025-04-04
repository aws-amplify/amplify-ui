import { renderHook } from '@testing-library/react';

import { useActionType } from '../actionType';
import { useLocation } from '../location';

import { StoreProvider } from '../StoreProvider';

function useStoreValues() {
  const actionType = useActionType();
  const location = useLocation();

  return { actionType, location };
}

describe('StoreProvider', () => {
  it('provides access to the expected context values', () => {
    const { result } = renderHook(() => useStoreValues(), {
      wrapper: StoreProvider,
    });

    const { actionType, location } = result.current;

    expect(actionType[0]).toBeUndefined();
    expect(typeof actionType[1]).toBe('function');

    expect(location[0]).toStrictEqual({
      current: undefined,
      path: '',
      key: '',
    });
    expect(typeof location[1]).toBe('function');
  });
});
