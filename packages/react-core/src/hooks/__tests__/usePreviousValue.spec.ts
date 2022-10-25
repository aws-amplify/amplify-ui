import { renderHook } from '@testing-library/react-hooks';

import usePreviousValue from '../usePreviousValue';

describe('usePreviousValue', () => {
  it('returns undefined on the initial render', () => {
    const value = 'value';
    const { result } = renderHook(() => usePreviousValue(value));

    expect(result.current).toBeUndefined();
  });
  it('returns the previous value after the initial render', () => {
    const value = 'value';
    const { result, rerender } = renderHook(() => usePreviousValue(value));

    expect(result.current).toBeUndefined();

    rerender();

    expect(result.current).toBe(value);
  });
});
