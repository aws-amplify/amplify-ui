import { Breakpoint } from '../primitives/types/responsive';
import { getValueAtCurrentBreakpoint } from '../primitives/shared/responsive/utils';
import { useBreakpoint } from '../primitives/shared/responsive/useBreakpoint';
import { useTheme } from './useTheme';
import { getStyleValue } from '../primitives/shared/getStyleValue';
import { isDesignToken, isString } from '@aws-amplify/ui';

interface UseBreakpointValue<T = unknown> {
  (
    values: Record<string, T> | T[],
    defaultBreakpoint?: Breakpoint,
    propKey?: string
  ): T | string | number | null;
}

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/theming/responsive#usebreakpointvalue)
 */
export const useBreakpointValue: UseBreakpointValue = (
  values,
  defaultBreakpoint = 'base',
  propKey
) => {
  const {
    breakpoints: { values: breakpoints },
    tokens,
  } = useTheme();

  const breakpoint = useBreakpoint({
    breakpoints,
    defaultBreakpoint,
  });

  const value = getValueAtCurrentBreakpoint({
    breakpoint,
    breakpoints,
    values,
  });

  if (isDesignToken(value) || isString(value)) {
    return getStyleValue({ value, propKey, tokens });
  } else {
    return value;
  }
};
