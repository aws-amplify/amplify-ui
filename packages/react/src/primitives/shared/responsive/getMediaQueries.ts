// Inspiration for getMediaQueries and useBreakpoint
// comes from https://github.com/iiroj/use-breakpoint/

import { GetMediaQueries } from '../../types/responsive';
import { objectKeys } from '../utils';

export const getMediaQueries: GetMediaQueries = ({ breakpoints }) => {
  const sortedBreakpoints = objectKeys(breakpoints).sort(
    (a, b) => breakpoints[b] - breakpoints[a]
  );

  return sortedBreakpoints.map((breakpoint, index) => {
    let query = '';

    const minWidth = breakpoints[breakpoint];
    const nextBreakpoint = sortedBreakpoints[index - 1];
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
