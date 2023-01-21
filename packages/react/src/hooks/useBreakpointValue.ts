import { Breakpoint } from '../primitives/types/responsive';
import { getValueAtCurrentBreakpoint } from '../primitives/shared/responsive/utils';
import { useBreakpoint } from '../primitives/shared/responsive/useBreakpoint';
import { useTheme } from './useTheme';
import { getStyleValue } from '../primitives/shared/getStyleValue';
import { isDesignToken } from '@aws-amplify/ui';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/theming/responsive#usebreakpointvalue)
 */
export function useBreakpointValue<T = unknown>(
  values: Record<string, T> | T[],
  defaultBreakpoint?: Breakpoint,
  propKey?: string
): T | string | number | null {
  const {
    breakpoints: { values: breakpoints },
    tokens,
  } = useTheme();

  const breakpoint = useBreakpoint({
    breakpoints,
    defaultBreakpoint: defaultBreakpoint ?? 'base',
  });

  const value = getValueAtCurrentBreakpoint({
    breakpoint,
    breakpoints,
    values,
  });

  if (isDesignToken(value) || typeof value === 'string') {
    return getStyleValue({ value, propKey, tokens });
  } else {
    return value;
  }
}
