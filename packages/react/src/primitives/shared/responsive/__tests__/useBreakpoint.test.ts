/** @jest-environment jsdom */

import { useBreakpoint } from '../useBreakpoint';
import { act, renderHook } from '@testing-library/react-hooks';
import MatchMediaMock from 'jest-matchmedia-mock';
import * as React from 'react';
import { Breakpoints } from '../../../types/responsive';
import { getMediaQueries } from '../getMediaQueries';

jest.mock('react', () => ({
  ...(jest.requireActual('react') as typeof React),
  useDebugValue: jest.fn(),
}));
const mockUseDebugValue = React.useDebugValue as jest.Mock<
  typeof React.useDebugValue
>;

const breakpoints: Breakpoints = {
  xl: { value: 80 },
  small: { value: 30 },
  base: { value: 0 },
  large: { value: 62 },
  medium: { value: 48 },
  xxl: { value: 96 },
};

const breakpointUnit = 'em';
const defaultBreakpoint = 'base';

let matchMedia: MatchMediaMock;
let mediaQueries = getMediaQueries({ breakpointUnit: 'em', breakpoints });

const testBreakpoints = (m) => {
  it(`should return ${m.breakpoint} breakpoint`, () => {
    matchMedia.useMediaQuery(m.query);
    const { result } = renderHook(() =>
      useBreakpoint({ breakpoints, breakpointUnit, defaultBreakpoint })
    );
    const breakpoint = result.current;

    expect(breakpoint).toBe(m.breakpoint);
    expect(mockUseDebugValue).toHaveBeenLastCalledWith(
      m.breakpoint,
      expect.any(Function)
    );
    if (m.breakpoint === 'base') {
      expect(mockUseDebugValue).toHaveBeenCalledTimes(1);
    } else {
      expect(mockUseDebugValue).toHaveBeenCalledTimes(2);
    }
  });
};

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
      useBreakpoint({ breakpoints, breakpointUnit, defaultBreakpoint })
    );
    const breakpoint = result.current;

    expect(breakpoint).toBe('base');
  });

  // Test going down and up the breakpoints
  mediaQueries.forEach(testBreakpoints);
  mediaQueries.reverse().forEach(testBreakpoints);
});
