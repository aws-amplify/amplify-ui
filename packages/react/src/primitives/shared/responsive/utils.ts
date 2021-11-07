import { isDesignToken } from '@aws-amplify/ui';

import { Breakpoint, Breakpoints } from '../../types/responsive';

export const getValueAtCurrentBreakpoint = (
  values: Record<string, any> | string[] | string,
  breakpoint: Breakpoint,
  breakpoints: Breakpoints
) => {
  if (isDesignToken(values)) {
    values = values.toString();
  }
  if (typeof values !== 'object') {
    return values;
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

  // Replace any breakpoint values if they are design tokens
  Object.keys(breakpointCompatValues).forEach((key) => {
    const value = breakpointCompatValues[key];
    if (isDesignToken(value)) {
      breakpointCompatValues[key] = value.toString();
    }
  });

  return getClosestValueByBreakpoint(
    breakpointCompatValues,
    breakpoint,
    breakpoints
  );
};

const getClosestValueByBreakpoint = (
  values: Record<string, any>,
  breakpoint: Breakpoint,
  breakpoints: Breakpoints
) => {
  // Use exact match
  if (values.hasOwnProperty(breakpoint)) {
    return values[breakpoint];
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
      return values[breakpoint];
    }
  }

  return null;
};
