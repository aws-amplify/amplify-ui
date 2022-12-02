import { renderHook } from '@testing-library/react-hooks';

import useHasValueUpdated from '../useHasValueUpdated';

describe('useHasValueUpdated', () => {
  it('return true on initial render and ignoring first render', () => {
    const value = 'value';
    const { result } = renderHook(() => useHasValueUpdated(value));

    expect(result.current).toBe(true);
  });

  it('return false on initial render when not ignoring first render', () => {
    const value = 'value';
    const { result } = renderHook(() => useHasValueUpdated(value, true));

    expect(result.current).toBe(false);
  });

  it('return false when current and updated values are equal', () => {
    const value = 'value';

    const { result, rerender } = renderHook((nextValue = value) =>
      useHasValueUpdated(nextValue, true)
    );

    expect(result.current).toBe(false);

    const sameValue = 'value';

    rerender(sameValue);

    expect(result.current).toBe(false);
  });

  it('returns true when value has updated', () => {
    const value = 'value';

    const { result, rerender } = renderHook((nextValue = value) =>
      useHasValueUpdated(nextValue, true)
    );

    expect(result.current).toBe(false);

    const updatedValue = 'updatedValue';

    rerender(updatedValue);

    expect(result.current).toBe(true);
  });
});
