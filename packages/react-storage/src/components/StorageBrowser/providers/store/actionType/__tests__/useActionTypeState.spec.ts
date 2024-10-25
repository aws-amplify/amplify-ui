import { act, renderHook } from '@testing-library/react';

import { useActionTypeState } from '../useActionTypeState';

const actionType = 'super-cool-action';

describe('useActionTypeState', () => {
  it('behaves as expected', () => {
    const { result } = renderHook(() => useActionTypeState());

    const [initialState, handler] = result.current;

    expect(initialState).toBeUndefined();

    act(() => {
      handler({ type: 'SET_ACTION_TYPE', actionType: 'super-cool-action' });
    });

    const [nextState] = result.current;

    expect(nextState).toBe(actionType);

    act(() => {
      handler({ type: 'RESET_ACTION_TYPE' });
    });

    const [finalState] = result.current;

    expect(finalState).toBeUndefined();
  });

  it('returns provided `initialState`', () => {
    const { result } = renderHook(() => useActionTypeState(actionType));

    const [initialState] = result.current;

    expect(initialState).toBe(actionType);
  });
});
