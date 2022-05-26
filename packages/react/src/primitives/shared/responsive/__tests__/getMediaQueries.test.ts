import { Breakpoints } from '../../../types/responsive';
import { getMediaQueries } from '../getMediaQueries';

const unSortedBreakpoints: Breakpoints = {
  xl: 1280,
  small: 480,
  base: 0,
  large: 992,
  medium: 768,
  xxl: 1536,
};

const expectedMediaQueries = [
  {
    breakpoint: 'xxl',
    maxWidth: null,
    minWidth: 1536,
    query: '(min-width: 1536px)',
  },
  {
    breakpoint: 'xl',
    maxWidth: 1535,
    minWidth: 1280,
    query: '(min-width: 1280px) and (max-width: 1535px)',
  },
  {
    breakpoint: 'large',
    maxWidth: 1279,
    minWidth: 992,
    query: '(min-width: 992px) and (max-width: 1279px)',
  },
  {
    breakpoint: 'medium',
    maxWidth: 991,
    minWidth: 768,
    query: '(min-width: 768px) and (max-width: 991px)',
  },
  {
    breakpoint: 'small',
    maxWidth: 767,
    minWidth: 480,
    query: '(min-width: 480px) and (max-width: 767px)',
  },
  {
    breakpoint: 'base',
    maxWidth: 479,
    minWidth: 0,
    query: '(min-width: 0px) and (max-width: 479px)',
  },
];

describe('getMediaQueries', () => {
  it('should return a sorted list of queries using px unit', () => {
    const result = getMediaQueries({
      breakpoints: unSortedBreakpoints,
    });
    // Didn't use a snapshot here because snapshots are too
    // easy to ignore and update without understanding why
    // they changed
    expect(result).toEqual(expectedMediaQueries);
    expect(result[0].query.includes('px')).toBe(true);
  });

  it('should handle negative min-width', () => {
    const negativeBreakpoints: Breakpoints = {
      ...unSortedBreakpoints,
      base: -1,
    };
    const expectedMediaQueriesNegWidth = [...expectedMediaQueries];
    expectedMediaQueriesNegWidth[5].minWidth = -1;
    expectedMediaQueriesNegWidth[5].query = '(max-width: 479px)';

    expect(
      getMediaQueries({
        breakpoints: negativeBreakpoints,
      })
    ).toEqual(expectedMediaQueriesNegWidth);
  });
});
