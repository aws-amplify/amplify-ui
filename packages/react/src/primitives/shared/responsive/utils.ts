import { Breakpoint, Breakpoints } from '../../types/responsive';

export const getValueAtCurrentBreakpoint = (
  values: Record<string, any> | string[],
  breakpoint: Breakpoint,
  breakpoints: Breakpoints
) => {
  let breakpointCompatValues = {};
  if (Array.isArray(values)) {
    values.map((value, index) => {
      breakpointCompatValues[Object.keys(breakpoints)[index]] = value;
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
  values,
  breakpoint: Breakpoint,
  breakpoints: Breakpoints
) => {
  // Use exact match
  if (values.hasOwnProperty(breakpoint)) {
    return values[breakpoint];
  }

  // Otherwise use a lower breakpoint value
  const keys = Object.keys(breakpoints).sort(
    (a, b) => breakpoints[b] - breakpoints[a]
  );
  const lowerKeys = keys.slice(keys.indexOf(breakpoint));
  for (let key of lowerKeys) {
    if (values.hasOwnProperty(key)) {
      return values[key];
    }
  }

  return null;
};
