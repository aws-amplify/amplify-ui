// Inspiration for getMediaQueries and useBreakpoint
// comes from https://github.com/iiroj/use-breakpoint/
// License MIT, Copyright (c) 2019 Iiro Jäppinen

import { Breakpoint, GetMediaQueries } from '../../types/responsive';

export const getMediaQueries: GetMediaQueries = ({
  breakpoints,
  breakpointUnit,
}) => {
  const sortedBreakpoints = Object.keys(breakpoints).sort(
    (a, b) => breakpoints[b] - breakpoints[a]
  );

  return (sortedBreakpoints as Array<Breakpoint>).map((breakpoint, index) => {
    let query = '';

    let minWidth = breakpoints[breakpoint];
    const nextBreakpoint = sortedBreakpoints[index - 1] as
      | Breakpoint
      | undefined;
    const maxWidth = nextBreakpoint ? breakpoints[nextBreakpoint] : null;

    if (minWidth >= 0) {
      query = `(min-width: ${minWidth}${breakpointUnit})`;
    }

    if (maxWidth !== null) {
      if (query) {
        query += ' and ';
      }
      query += `(max-width: ${maxWidth - 1}${breakpointUnit})`;
    }

    return {
      breakpoint,
      query,
      maxWidth,
      minWidth,
    };
  });
};
