import { isDesignToken, WebTheme } from '@aws-amplify/ui';

import { getCSSVariableIfValueIsThemeKey } from '../../shared/utils';
import { Breakpoint, Breakpoints } from '../../types/responsive';
import { ThemeStylePropKey } from '../../types/theme';

const getClosestValueByBreakpoint = <Value>({
  breakpoint,
  breakpoints,
  propKey,
  values,
  tokens,
}: {
  breakpoint: Breakpoint;
  breakpoints: Breakpoints;
  propKey: ThemeStylePropKey;
  values: Record<string, Value>;
  tokens: WebTheme['tokens'];
}): string | Value => {
  // Check if breakpoint exists in values
  if (values[breakpoint] !== undefined) {
    const value = values[breakpoint];
    return isDesignToken(value)
      ? value.toString()
      : getCSSVariableIfValueIsThemeKey(propKey, value, tokens);
  }

  // Otherwise use a lower breakpoint value
  const breakpointsDesc = Object.keys(breakpoints).sort(
    (a, b) => breakpoints[b] - breakpoints[a]
  );
  const lowerBreakpoints = breakpointsDesc.slice(
    breakpointsDesc.indexOf(breakpoint)
  );
  for (const breakpoint of lowerBreakpoints) {
    // Check if breakpoint exists in values
    if (values[breakpoint] !== undefined) {
      const value = values[breakpoint];
      return isDesignToken(value)
        ? value.toString()
        : getCSSVariableIfValueIsThemeKey(propKey, value, tokens);
    }
  }

  return null;
};

export const getValueAtCurrentBreakpoint = <Value>({
  breakpoint,
  breakpoints,
  propKey,
  values,
  tokens,
}: {
  values: Record<string, Value> | Value[] | Value;
  breakpoint: Breakpoint;
  breakpoints: Breakpoints;
  propKey?: ThemeStylePropKey;
  tokens: WebTheme['tokens'];
}): string | Value => {
  // if value is a DesignToken use its toString()
  if (isDesignToken(values)) {
    return values.toString();
  }

  if (typeof values !== 'object') {
    return getCSSVariableIfValueIsThemeKey(propKey, values, tokens);
  }

  let breakpointCompatValues = {};
  const breakpointsAscending = Object.keys(breakpoints).sort(
    (a, b) => breakpoints[a] - breakpoints[b]
  );
  if (Array.isArray(values)) {
    values.map((value, index) => {
      breakpointCompatValues[breakpointsAscending[index]] = value;
    });
  } else {
    breakpointCompatValues = values;
  }

  return getClosestValueByBreakpoint<Value>({
    breakpoint,
    breakpoints,
    propKey,
    values: breakpointCompatValues,
    tokens,
  });
};
