import { useTheme } from './useTheme';
import { useBreakpoint } from '../primitives/shared/responsive/useBreakpoint';
import { Breakpoint } from '../primitives/types/responsive';

/**
 * Hook to get the current breakpoint of the provided theme.
 * @returns {Breakpoint}
 */
export const useThemeBreakpoint = (): Breakpoint => {
  const {
    breakpoints: {
      values: breakpoints,
      unit: breakpointUnit,
      defaultBreakpoint,
    },
  } = useTheme();

  const breakpoint = useBreakpoint({
    breakpoints,
    breakpointUnit,
    defaultBreakpoint: defaultBreakpoint as Breakpoint,
  });

  return breakpoint;
};
