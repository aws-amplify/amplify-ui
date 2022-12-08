import { Breakpoint } from '../primitives/types/responsive';
import { getValueAtCurrentBreakpoint } from '../primitives/shared/responsive/utils';
import { useBreakpoint } from '../primitives/shared/responsive/useBreakpoint';
import { useTheme } from './useTheme';
import { ThemeStylePropKey } from '../primitives/types/theme';

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
    tokens,
  } = useTheme();

  const breakpoint = useBreakpoint({
    breakpoints,
    defaultBreakpoint,
  });

  return getValueAtCurrentBreakpoint({
    breakpoint,
    breakpoints,
    propKey: propKey as ThemeStylePropKey,
    values,
    tokens,
  });
}
