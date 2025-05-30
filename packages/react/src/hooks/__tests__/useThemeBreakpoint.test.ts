import { renderHook } from '@testing-library/react';
import { useThemeBreakpoint } from '../useThemeBreakpoint';

describe('useThemeBreakpoint', () => {
  it('returns the default breakpoint value', () => {
    const { result } = renderHook(useThemeBreakpoint);

    expect(result.current).toBe('base');
  });
});
