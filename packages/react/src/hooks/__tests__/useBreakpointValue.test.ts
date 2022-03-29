/** @jest-environment jsdom */

import { useBreakpointValue } from '../useBreakpointValue';
import { act, renderHook } from '@testing-library/react-hooks';
import MatchMediaMock from 'jest-matchmedia-mock';
import * as React from 'react';
import { getMediaQueries } from '../../primitives/shared/responsive/getMediaQueries';
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

let matchMedia: MatchMediaMock;
let mediaQueries = getMediaQueries({
  breakpoints: defaultTheme.breakpoints.values,
});

describe('useBreakpoint', () => {
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
    `should return $breakpoint breakpoint`,
    ({ breakpoint, query }) => {
      matchMedia.useMediaQuery(query);
      const { result } = renderHook(() => useBreakpointValue(breakpoints));
      const breakpointValue = result;

      expect(breakpointValue.current).toBe(`${breakpoint}Value`);
    }
  );

  test.each(mediaQueries.reverse())(
    `should return $breakpoint breakpoint`,
    ({ breakpoint, query }) => {
      matchMedia.useMediaQuery(query);
      const { result } = renderHook(() => useBreakpointValue(breakpoints));
      const breakpointValue = result;

      expect(breakpointValue.current).toBe(`${breakpoint}Value`);
    }
  );
});
