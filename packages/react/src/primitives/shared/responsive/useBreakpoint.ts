// Inspiration for getMediaQueries and useBreakpoint
// comes from https://github.com/iiroj/use-breakpoint/

import * as React from 'react';
import type { Breakpoint, UseBreakpoint } from '../../types/responsive';
import { getMediaQueries } from './getMediaQueries';

const useIsomorphicEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

export const useBreakpoint: UseBreakpoint = ({
  breakpoints,
  defaultBreakpoint,
}) => {
  const supportMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
  const matchMedia = supportMatchMedia ? window.matchMedia : null;

  const mediaQueries = React.useMemo(
    () => getMediaQueries({ breakpoints }),
    [breakpoints]
  );

  const [breakpoint, setBreakpoint] =
    React.useState<Breakpoint>(defaultBreakpoint);

  const updateBreakpoint = React.useCallback(
    (matches: boolean, breakpoint: Breakpoint) => {
      if (matches) {
        setBreakpoint(breakpoint);
      }
    },
    [setBreakpoint]
  );

  useIsomorphicEffect(() => {
    if (!matchMedia) return;
    const unsubscribeList = mediaQueries.map(({ query, breakpoint }) => {
      const queryList = matchMedia(query);
      updateBreakpoint(queryList.matches, breakpoint);
      const handleMediaChange = (event: MediaQueryListEvent) => {
        if (event.matches) {
          setBreakpoint(breakpoint);
        }
      };
      queryList.addEventListener('change', handleMediaChange);
      return () => queryList.removeEventListener('change', handleMediaChange);
    });
    return () => {
      unsubscribeList.forEach((unsubscribe) => unsubscribe());
    };
  }, [breakpoints, setBreakpoint, matchMedia, mediaQueries]);

  /** Print a nice debug value for React Devtools */
  React.useDebugValue(breakpoint, (breakpoint) => breakpoint);

  return breakpoint;
};
