/** @jest-environment jsdom */

import { useBreakpointValue } from '../useBreakpointValue';
import { renderHook } from '@testing-library/react-hooks';
import MatchMediaMock from 'jest-matchmedia-mock';
import * as React from 'react';
import { getMediaQueries } from '../../primitives/shared/responsive/getMediaQueries';
import { MediaQueryBreakpoint } from '../../primitives/types/responsive';
import { defaultTheme } from '@aws-amplify/ui';

jest.mock('react', () => ({
  ...(jest.requireActual('react') as typeof React),
  useDebugValue: jest.fn(),
}));
const mockUseDebugValue = React.useDebugValue as jest.Mock<
  typeof React.useDebugValue
>;

const breakpoints = {
  xl: 'xlValue',
  small: 'smallValue',
  base: 'baseValue',
  medium: 'mediumValue',
  large: 'largeValue',
  xxl: 'xxlValue',
};

const defaultBreakpoint = 'base';

// map over output of getMediaQueries to get an array formatted to be printable by jest.each
const mediaQueries: [
  MediaQueryBreakpoint['breakpoint'],
  MediaQueryBreakpoint
][] = getMediaQueries({
  breakpoints: defaultTheme.breakpoints.values,
}).map((mediaQuery) => [mediaQuery.breakpoint, mediaQuery]);

describe('useBreakpoint', () => {
  let matchMedia: MatchMediaMock;
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
    mockUseDebugValue.mockClear();
  });

  it('should return default breakpoint', () => {
    const { result } = renderHook(() =>
      useBreakpointValue(breakpoints, defaultBreakpoint)
    );
    const breakpoint = result.current;

    expect(breakpoint).toBe('baseValue');
  });

  test.each(mediaQueries)(
    'should return %s breakpoint',
    (breakpoint, { query }) => {
      matchMedia.useMediaQuery(query);
      const { result } = renderHook(() => useBreakpointValue(breakpoints));
      const breakpointValue = result;

      expect(breakpointValue.current).toBe(`${breakpoint as string}Value`);
    }
  );

  test.each(mediaQueries.reverse())(
    'should return %s breakpoint - reverse',
    (breakpoint, { query }) => {
      matchMedia.useMediaQuery(query);
      const { result } = renderHook(() => useBreakpointValue(breakpoints));
      const breakpointValue = result;

      expect(breakpointValue.current).toBe(`${breakpoint as string}Value`);
    }
  );

  test('handles an object with boolean values as a breakpoints argument', () => {
    const { result } = renderHook(() =>
      useBreakpointValue({
        base: false,
        medium: true,
      })
    );

    expect(result.current).toBe(true);
  });
});
