import { WebDesignToken } from '@aws-amplify/ui';
import { renderHook } from '@testing-library/react-hooks';

import { useTheme } from '../../../../hooks/useTheme';
import { Breakpoints, ValueBreakpoints } from '../../../types/responsive';
import { getValueAtCurrentBreakpoint } from '../utils';

const breakpoints: Breakpoints = {
  xl: 80,
  small: 30,
  base: 0,
  large: 62,
  medium: 48,
  xxl: 96,
};

describe('getValueAtCurrentBreakpoint', () => {
  it('should support object values syntax', () => {
    const { result } = renderHook(() => useTheme());
    const { tokens } = result.current;
    const values: ValueBreakpoints<string | WebDesignToken> = {
      base: 'red',
      medium: tokens.colors.red[10],
      large: 'red.60',
    };

    const baseResult = getValueAtCurrentBreakpoint({
      breakpoint: 'base',
      breakpoints,
      values,
      tokens,
    });
    const smallResult = getValueAtCurrentBreakpoint({
      breakpoint: 'small',
      breakpoints,
      values,
      tokens,
    });
    const mediumResult = getValueAtCurrentBreakpoint({
      breakpoint: 'medium',
      breakpoints,
      values,
      tokens,
    });
    const largeResult = getValueAtCurrentBreakpoint({
      breakpoint: 'large',
      breakpoints,
      values,
      tokens,
    });

    expect(baseResult).toBe(values.base);
    // "small" breakpoint not specified, so should fallback to "base" value
    expect(smallResult).toBe(values.base);
    expect(mediumResult).toEqual(values.medium);
    expect(largeResult).toBe('red.60');
  });

  it('should support array values syntax', () => {
    const { result } = renderHook(() => useTheme());
    const { tokens } = result.current;
    const values = ['pink', tokens.colors.pink[60], 'pink.80'];

    const baseResult = getValueAtCurrentBreakpoint({
      breakpoint: 'base',
      breakpoints,
      values,
      tokens,
    });
    const smallResult = getValueAtCurrentBreakpoint({
      breakpoint: 'small',
      breakpoints,
      values,
      tokens,
    });
    const mediumResult = getValueAtCurrentBreakpoint({
      breakpoint: 'medium',
      breakpoints,
      values,
      tokens,
    });
    const largeResult = getValueAtCurrentBreakpoint({
      breakpoint: 'large',
      breakpoints,
      values,
      tokens,
    });
    expect(baseResult).toBe(values[0]);
    expect(smallResult).toEqual(values[1]);
    expect(mediumResult).toBe('pink.80');
    expect(largeResult).toBe('pink.80');
  });

  it('handles a breakpoint that resolves to a false value from values correctly', () => {
    const { result } = renderHook(() => useTheme());
    const { tokens } = result.current;
    const output = getValueAtCurrentBreakpoint({
      breakpoint: 'base',
      breakpoints,
      values: {
        base: false,
        medium: true,
      },
      tokens,
    });

    expect(output).toBe(false);
  });
});
