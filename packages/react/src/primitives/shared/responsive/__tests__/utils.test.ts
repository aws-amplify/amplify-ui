import { renderHook } from '@testing-library/react-hooks';

import { useTheme } from '../../../../hooks/useTheme';
import { Breakpoints } from '../../../types/responsive';
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
  it('should return string values directly', () => {
    const { result } = renderHook(() => useTheme());
    const { tokens } = result.current;
    const output = getValueAtCurrentBreakpoint({
      breakpoint: 'base',
      breakpoints,
      values: '20px',
      tokens,
    });
    expect(output).toBe('20px');
  });

  it('should return number values directly', () => {
    const { result } = renderHook(() => useTheme());
    const { tokens } = result.current;
    const output = getValueAtCurrentBreakpoint({
      breakpoint: 'base',
      breakpoints,
      values: 0,
      tokens,
    });
    expect(output).toBe(0);
  });

  it('should return design token toString value directly', () => {
    const { result } = renderHook(() => useTheme());
    const { tokens } = result.current;
    const value = getValueAtCurrentBreakpoint({
      breakpoint: 'base',
      breakpoints,
      values: tokens.colors.red[10],
      tokens,
    });
    expect(value).toBe(tokens.colors.red[10].toString());
  });

  it('should support object values syntax', () => {
    const { result } = renderHook(() => useTheme());
    const { tokens } = result.current;
    const values = {
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
      propKey: 'backgroundColor',
      values,
      tokens,
    });

    expect(baseResult).toBe(values.base);
    // "small" breakpoint not specified, so should fallback to "base" value
    expect(smallResult).toBe(values.base);
    expect(mediumResult).toBe(values.medium.toString());
    expect(largeResult).toBe('var(--amplify-colors-red-60)');
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
      propKey: 'backgroundColor',
      values,
      tokens,
    });
    const largeResult = getValueAtCurrentBreakpoint({
      breakpoint: 'large',
      breakpoints,
      propKey: 'backgroundColor',
      values,
      tokens,
    });
    expect(baseResult).toBe(values[0]);
    expect(smallResult).toBe(values[1].toString());
    expect(mediumResult).toBe('var(--amplify-colors-pink-80)');
    expect(largeResult).toBe('var(--amplify-colors-pink-80)');
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
