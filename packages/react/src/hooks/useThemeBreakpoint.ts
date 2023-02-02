import { useTheme } from './useTheme';
import { useBreakpoint } from '../primitives/shared/responsive/useBreakpoint';
import { Breakpoint } from '../primitives/types/responsive';

/**
 * Hook to get the current breakpoint of the provided theme.
 * @returns {Breakpoint}
 */
export const useThemeBreakpoint = (): Breakpoint => {
  const {
    breakpoints: { values: breakpoints, defaultBreakpoint },
  } = useTheme();

  const breakpoint = useBreakpoint({
    breakpoints,
    defaultBreakpoint,
  });

  return breakpoint;
};
