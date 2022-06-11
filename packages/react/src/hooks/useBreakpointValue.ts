import { Breakpoint } from '../primitives/types/responsive';
import { getValueAtCurrentBreakpoint } from '../primitives/shared/responsive/utils';
import { useBreakpoint } from '../primitives/shared/responsive/useBreakpoint';
import { useTheme } from './useTheme';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/theming/responsive#usebreakpointvalue)
 */
export function useBreakpointValue<T>(
  values: Record<string, T> | T[],
  defaultBreakpoint?: Breakpoint,
  propKey?: string
): T | string {
  const {
    breakpoints: { values: breakpoints },
  } = useTheme();

  const breakpoint = useBreakpoint({
    breakpoints,
    defaultBreakpoint,
  });

  return getValueAtCurrentBreakpoint(values, breakpoint, breakpoints, propKey);
}
