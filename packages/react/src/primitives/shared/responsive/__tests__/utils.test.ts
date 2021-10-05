import { Breakpoints } from 'src/primitives/types/responsive';
import { getValueAtCurrentBreakpoint } from '../utils';

const breakpoints: Breakpoints = {
  xl: { value: 80 },
  small: { value: 30 },
  base: { value: 0 },
  large: { value: 62 },
  medium: { value: 48 },
  xxl: { value: 96 },
};

describe('getValueAtCurrentBreakpoint', () => {
  it('should return string values directly', () => {
    const result = getValueAtCurrentBreakpoint('20px', 'base', breakpoints);
    expect(result).toBe('20px');
  });
  it('should support object values syntax', () => {
    const values = { base: '20px', medium: '40px' };

    const baseResult = getValueAtCurrentBreakpoint(values, 'base', breakpoints);
    const smallResult = getValueAtCurrentBreakpoint(
      values,
      'small',
      breakpoints
    );
    const mediumResult = getValueAtCurrentBreakpoint(
      values,
      'medium',
      breakpoints
    );
    expect(baseResult).toBe(values.base);
    // "small" breakpoint not specified, so should fallback to "base" value
    expect(smallResult).toBe(values.base);
    expect(mediumResult).toBe(values.medium);
  });

  it('should support array values syntax', () => {
    const values = ['20px', '40px', '30px'];

    const baseResult = getValueAtCurrentBreakpoint(values, 'base', breakpoints);
    const smallResult = getValueAtCurrentBreakpoint(
      values,
      'small',
      breakpoints
    );
    const mediumResult = getValueAtCurrentBreakpoint(
      values,
      'medium',
      breakpoints
    );
    expect(baseResult).toBe(values[0]);
    expect(smallResult).toBe(values[1]);
    expect(mediumResult).toBe(values[2]);
  });
});
