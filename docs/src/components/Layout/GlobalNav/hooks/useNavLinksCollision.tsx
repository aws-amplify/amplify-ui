import { useEffect, useLayoutEffect, useState } from 'react';

function throttleResize(resizeFunction, throttle) {
  let timeoutId;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(resizeFunction, throttle);
  };
}

export function useNavLinksCollision(navLinksContainerRef, navLinksRightRef) {
  const BEST_BREAKPOINT_GUESS = 1200;

  let windowInnerWidth = 0;
  if (typeof window !== 'undefined') {
    windowInnerWidth = window.innerWidth;
  }

  const [isMobileState, setIsMobileState] = useState(
    windowInnerWidth < BEST_BREAKPOINT_GUESS
  );

  const [mobileNavBreakpoint, setMobileNavBreakpoint] =
    useState(windowInnerWidth);

  const [currentWindowInnerWidth, setCurrentWindowInnerWidth] =
    useState(windowInnerWidth);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setCurrentWindowInnerWidth(window.innerWidth);

      if (navLinksContainerRef.current && navLinksRightRef.current) {
        const navLinksContainerBCR =
          navLinksContainerRef.current.getBoundingClientRect();
        const navLinksRightBCR =
          navLinksRightRef.current.getBoundingClientRect();

        if (navLinksRightBCR.right > navLinksContainerBCR.right) {
          setIsMobileState(true);
          setMobileNavBreakpoint(window.innerWidth);
        }
      }
    };

    handleWindowSizeChange();
    const throttledFunction = throttleResize(handleWindowSizeChange, 20);
    window.addEventListener('resize', throttledFunction);

    return () => {
      window.removeEventListener('resize', throttledFunction);
    };
  }, [navLinksContainerRef, navLinksRightRef]);

  useLayoutEffect(() => {
    if (currentWindowInnerWidth > mobileNavBreakpoint) {
      setIsMobileState(false);
    }
  }, [currentWindowInnerWidth, mobileNavBreakpoint]);

  return isMobileState;
}
