import { Breakpoint } from '../primitives/types/responsive';
import { getValueAtCurrentBreakpoint } from '../primitives/shared/responsive/utils';
import { useBreakpoint } from '../primitives/shared/responsive/useBreakpoint';
import { useTheme } from './useTheme';

export function useBreakpointValue<T>(
  values: Record<string, T> | T[] | string,
  defaultBreakpoint?: Breakpoint
): T | null {
  const {
    breakpoints: { values: breakpoints },
  } = useTheme();

  const breakpoint = useBreakpoint({
    breakpoints,
    defaultBreakpoint: defaultBreakpoint,
  });

  return getValueAtCurrentBreakpoint(values, breakpoint, breakpoints);
}
