import { isDesignToken } from '@aws-amplify/ui';

import { getCSSVariableIfValueIsThemeKey } from '../../shared/utils';
import { Breakpoint, Breakpoints } from '../../types/responsive';
import { ThemeStylePropKey } from '../../types/theme';

const getClosestValueByBreakpoint = <Value>({
  breakpoint,
  breakpoints,
  propKey,
  values,
}: {
  breakpoint: Breakpoint;
  breakpoints: Breakpoints;
  propKey: ThemeStylePropKey;
  values: Record<string, Value>;
}): string | Value => {
  // Use exact match
  if (values[breakpoint]) {
    const value = values[breakpoint];
    return isDesignToken(value)
      ? value.toString()
      : getCSSVariableIfValueIsThemeKey(propKey, value);
  }

  // Otherwise use a lower breakpoint value
  const breakpointsDesc = Object.keys(breakpoints).sort(
    (a, b) => breakpoints[b] - breakpoints[a]
  );
  const lowerBreakpoints = breakpointsDesc.slice(
    breakpointsDesc.indexOf(breakpoint)
  );
  for (const breakpoint of lowerBreakpoints) {
    if (values[breakpoint]) {
      const value = values[breakpoint];
      return isDesignToken(value)
        ? value.toString()
        : getCSSVariableIfValueIsThemeKey(propKey, value);
    }
  }

  return null;
};

export const getValueAtCurrentBreakpoint = <Value>({
  breakpoint,
  breakpoints,
  propKey,
  values,
}: {
  values: Record<string, Value> | Value[] | Value;
  breakpoint: Breakpoint;
  breakpoints: Breakpoints;
  propKey?: ThemeStylePropKey;
}): string | Value => {
  // if value is a DesignToken use its toString()
  if (isDesignToken(values)) {
    return values.toString();
  }

  if (typeof values !== 'object') {
    return getCSSVariableIfValueIsThemeKey(propKey, values);
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
  });
};
