import * as React from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';
import { renderHook } from '@testing-library/react-hooks';

import { Breakpoints } from '../../../types/responsive';
import { getMediaQueries } from '../getMediaQueries';
import { useBreakpoint } from '../useBreakpoint';

jest.mock('react', () => ({
  ...jest.requireActual<typeof React>('react'),
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

const mediaQueries = getMediaQueries({ breakpoints });

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
      useBreakpoint({ breakpoints, defaultBreakpoint })
    );
    const breakpoint = result.current;

    expect(breakpoint).toBe('base');
  });

  it.each(mediaQueries)(
    `should return the $breakpoint breakpoint as expected`,
    ({ query, breakpoint }) => {
      matchMedia.useMediaQuery(query);
      const { result } = renderHook(() =>
        useBreakpoint({ breakpoints, defaultBreakpoint })
      );
      const resultBreakpoint = result.current;

      expect(resultBreakpoint).toBe(breakpoint);
      expect(mockUseDebugValue).toHaveBeenLastCalledWith(
        breakpoint,
        expect.any(Function)
      );

      if (breakpoint === 'base') {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(mockUseDebugValue).toHaveBeenCalledTimes(1);
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(mockUseDebugValue).toHaveBeenCalledTimes(2);
      }
    }
  );

  it.each(mediaQueries.reverse())(
    `should return the $breakpoint breakpoint as expected (reverse order)`,
    ({ query, breakpoint }) => {
      matchMedia.useMediaQuery(query);
      const { result } = renderHook(() =>
        useBreakpoint({ breakpoints, defaultBreakpoint })
      );
      const resultBreakpoint = result.current;

      expect(resultBreakpoint).toBe(breakpoint);
      expect(mockUseDebugValue).toHaveBeenLastCalledWith(
        breakpoint,
        expect.any(Function)
      );

      if (breakpoint === 'base') {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(mockUseDebugValue).toHaveBeenCalledTimes(1);
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(mockUseDebugValue).toHaveBeenCalledTimes(2);
      }
    }
  );
});
