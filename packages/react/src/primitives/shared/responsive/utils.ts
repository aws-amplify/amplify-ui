import { Breakpoint, Breakpoints } from '../../types/responsive';

export const getValueAtCurrentBreakpoint = (
  values: Record<string, any> | string[] | string,
  breakpoint: Breakpoint,
  breakpoints: Breakpoints
) => {
  if (typeof values !== 'object') {
    return values;
  }
  let breakpointCompatValues = {};
  const breakpointsAscending = Object.keys(breakpoints).sort(
    (a, b) => breakpoints[a].value - breakpoints[b].value
  );
  if (Array.isArray(values)) {
    values.map((value, index) => {
      breakpointCompatValues[breakpointsAscending[index]] = value;
    });
  } else {
    breakpointCompatValues = values;
  }

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
