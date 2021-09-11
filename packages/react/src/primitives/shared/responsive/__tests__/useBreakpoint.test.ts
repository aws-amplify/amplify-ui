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
  xl: 80,
  small: 30,
  base: 0,
  large: 62,
  medium: 48,
  xxl: 96,
};

const breakpointUnit = 'em';
const defaultBreakpoint = 'base';

let matchMedia: MatchMediaMock;
let mediaQueries = getMediaQueries({ breakpointUnit: 'em', breakpoints });
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

  mediaQueries.forEach((m) => {
    it(`should return ${m.breakpoint.toString()} breakpoint`, () => {
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
  });

  it('should react to changes to matchMedia', () => {
    matchMedia.useMediaQuery('(min-width: 0)');

    const { result } = renderHook(() =>
      useBreakpoint({ breakpoints, breakpointUnit, defaultBreakpoint })
    );

    expect(result.current).toBe('base');
    expect(mockUseDebugValue).toHaveBeenCalledTimes(1);

    act(() => {
      matchMedia.useMediaQuery('(min-width: 48em) and (max-width: 61em)');
    });

    expect(result.current).toBe('medium');
    expect(mockUseDebugValue).toHaveBeenCalledTimes(2);

    act(() => {
      matchMedia.useMediaQuery('(min-width: 30em) and (max-width: 47em)');
    });

    expect(result.current).toBe('small');
    expect(mockUseDebugValue).toHaveBeenCalledTimes(3);
  });
});
