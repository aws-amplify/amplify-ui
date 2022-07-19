import { isDesignToken } from '@aws-amplify/ui';

import { getCSSVariableIfValueIsThemeKey } from '../../shared/utils';
import { Breakpoint, Breakpoints } from '../../types/responsive';

export const getValueAtCurrentBreakpoint = <Value>(
  values: Record<string, Value> | Value[] | Value,
  breakpoint: Breakpoint,
  breakpoints: Breakpoints,
  propKey?: string
) => {
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

  return getClosestValueByBreakpoint<Value>(
    propKey,
    breakpointCompatValues,
    breakpoint,
    breakpoints
  );
};

const getClosestValueByBreakpoint = <Value>(
  propKey: string,
  values: Record<string, Value>,
  breakpoint: Breakpoint,
  breakpoints: Breakpoints
): string | Value => {
  // Use exact match
  if (values.hasOwnProperty(breakpoint)) {
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
    if (values.hasOwnProperty(breakpoint)) {
      const value = values[breakpoint];
      return isDesignToken(value)
        ? value.toString()
        : getCSSVariableIfValueIsThemeKey(propKey, value);
    }
  }

  return null;
};
