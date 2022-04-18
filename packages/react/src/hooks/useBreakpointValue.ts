import { Breakpoint } from '../primitives/types/responsive';
import { getValueAtCurrentBreakpoint } from '../primitives/shared/responsive/utils';
import { useBreakpoint } from '../primitives/shared/responsive/useBreakpoint';
import { useTheme } from './useTheme';

export function useBreakpointValue<T>(
  values: Record<string, T> | T[],
  defaultBreakpoint?: Breakpoint
): T | null {
  const {
    breakpoints: { values: breakpoints },
  } = useTheme();

  const breakpoint = useBreakpoint({
    breakpoints,
    defaultBreakpoint,
  });

  return getValueAtCurrentBreakpoint(values, breakpoint, breakpoints);
}
