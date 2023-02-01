import { defaultTheme } from '@aws-amplify/ui';

import { objectKeys } from '../../shared/utils';
import {
  Breakpoint,
  Breakpoints,
  ValueBreakpoints,
} from '../../types/responsive';

const getClosestValueByBreakpoint = <Value = unknown>({
  breakpoint,
  breakpoints,
  values,
}: {
  breakpoint: Breakpoint;
  breakpoints: Breakpoints;
  values: ValueBreakpoints<Value>;
}): Value | null => {
  const value = values[breakpoint];

  // Check if breakpoint exists in values
  if (value !== undefined) {
    return value;
  }

  // Otherwise use a lower breakpoint value
  const breakpointsDesc = objectKeys(breakpoints).sort(
    (a, b) => breakpoints[b] - breakpoints[a]
  );

  const lowerBreakpoints = breakpointsDesc.slice(
    breakpointsDesc.indexOf(breakpoint)
  );
  for (const breakpoint of lowerBreakpoints) {
    // Check if breakpoint exists in values
    const value = values[breakpoint];
    if (value !== undefined) {
      return value;
    }
  }

  return null;
};

/**
 * This takes an object and will return an object that only has the
 * breakpoint keys
 * @param obj
 * @returns
 */
const valueObjToBreakpoints = <Value>(
  obj: Record<string, Value>
): ValueBreakpoints<Value> => {
  return objectKeys(obj).reduce(
    (acc, key) =>
      key in defaultTheme.breakpoints.values
        ? { ...acc, [key]: obj[key] }
        : acc,
    {}
  );
};

export const getValueAtCurrentBreakpoint = <Value = string | number>({
  breakpoint,
  breakpoints,
  values,
}: {
  values: ValueBreakpoints<Value> | Value[];
  breakpoint: Breakpoint;
  breakpoints: Breakpoints;
}): Value | string | number | null => {
  let breakpointCompatValues: Partial<Record<Breakpoint, Value>> = {};

  const breakpointsAscending = objectKeys(breakpoints).sort(
    (a, b) => breakpoints[a] - breakpoints[b]
  );

  if (Array.isArray(values)) {
    values.forEach((value, index) => {
      breakpointCompatValues[breakpointsAscending[index]] = value;
    });
  } else if (typeof values === 'object') {
    breakpointCompatValues = valueObjToBreakpoints(values);
  }

  return getClosestValueByBreakpoint<Value>({
    breakpoint,
    breakpoints,
    values: breakpointCompatValues,
  });
};
