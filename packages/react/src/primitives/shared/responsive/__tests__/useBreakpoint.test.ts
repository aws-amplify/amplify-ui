/** @jest-environment jsdom */

import { useBreakpoint } from '../useBreakpoint';
import { renderHook } from '@testing-library/react-hooks';
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
  xl: 1280,
  small: 480,
  base: 0,
  medium: 768,
  large: 992,
  xxl: 1536,
};

const defaultBreakpoint = 'base';

let matchMedia: MatchMediaMock;
let mediaQueries = getMediaQueries({ breakpoints });

const testBreakpoints = (m) => {
  it(`should return ${m.breakpoint} breakpoint`, () => {
    matchMedia.useMediaQuery(m.query);
    const { result } = renderHook(() =>
      useBreakpoint({ breakpoints, defaultBreakpoint })
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
      useBreakpoint({ breakpoints, defaultBreakpoint })
    );
    const breakpoint = result.current;

    expect(breakpoint).toBe('base');
  });

  // Test going down and up the breakpoints
  mediaQueries.forEach(testBreakpoints);
  mediaQueries.reverse().forEach(testBreakpoints);
});
