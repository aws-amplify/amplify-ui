import { Breakpoints } from '../../../types/responsive';
import { getMediaQueries } from '../getMediaQueries';

const unSortedBreakpoints: Breakpoints = {
  xl: 80,
  small: 30,
  base: 0,
  large: 62,
  medium: 48,
  xxl: 96,
};

const expectedMediaQueries = [
  {
    breakpoint: 'xxl',
    maxWidth: null,
    minWidth: 96,
    query: '(min-width: 96em)',
  },
  {
    breakpoint: 'xl',
    maxWidth: 96,
    minWidth: 80,
    query: '(min-width: 80em) and (max-width: 95em)',
  },
  {
    breakpoint: 'large',
    maxWidth: 80,
    minWidth: 62,
    query: '(min-width: 62em) and (max-width: 79em)',
  },
  {
    breakpoint: 'medium',
    maxWidth: 62,
    minWidth: 48,
    query: '(min-width: 48em) and (max-width: 61em)',
  },
  {
    breakpoint: 'small',
    maxWidth: 48,
    minWidth: 30,
    query: '(min-width: 30em) and (max-width: 47em)',
  },
  {
    breakpoint: 'base',
    maxWidth: 30,
    minWidth: 0,
    query: '(min-width: 0em) and (max-width: 29em)',
  },
];

describe('getMediaQueries', () => {
  it('should return a sorted list of queries and use breakpointUnit', () => {
    const result = getMediaQueries({
      breakpoints: unSortedBreakpoints,
      breakpointUnit: 'em',
    });
    // Didn't use a snapshot here because snapshots are too
    // easy to ignore and update without understanding why
    // they changed
    expect(result).toEqual(expectedMediaQueries);
    expect(result[0].query.includes('em')).toBe(true);
  });

  it('should handle negative min-width', () => {
    const negativeBreakpoints: Breakpoints = {
      ...unSortedBreakpoints,
      base: -1,
    };
    const expectedMediaQueriesNegWidth = [...expectedMediaQueries];
    expectedMediaQueriesNegWidth[5].minWidth = -1;
    expectedMediaQueriesNegWidth[5].query = '(max-width: 29em)';

    expect(
      getMediaQueries({
        breakpoints: negativeBreakpoints,
        breakpointUnit: 'em',
      })
    ).toEqual(expectedMediaQueriesNegWidth);
  });
});
