// Inspiration for getMediaQueries and useBreakpoint
// comes from https://github.com/iiroj/use-breakpoint/

import { Breakpoint, GetMediaQueries } from '../../types/responsive';

export const getMediaQueries: GetMediaQueries = ({ breakpoints }) => {
  const sortedBreakpoints = Object.keys(breakpoints).sort(
    (a, b) => breakpoints[b] - breakpoints[a]
  );

  return (sortedBreakpoints as Array<Breakpoint>).map((breakpoint, index) => {
    let query = '';

    const minWidth = breakpoints[breakpoint];
    const nextBreakpoint = sortedBreakpoints[index - 1] as
      | Breakpoint
      | undefined;
    const maxWidth = nextBreakpoint ? breakpoints[nextBreakpoint] - 1 : null;

    if (minWidth >= 0) {
      query = `(min-width: ${minWidth}px)`;
    }

    if (maxWidth !== null) {
      if (query) {
        query += ' and ';
      }
      query += `(max-width: ${maxWidth}px)`;
    }

    return {
      breakpoint,
      query,
      maxWidth,
      minWidth,
    };
  });
};
