import { Flex, Text, View } from '@aws-amplify/ui-react';
import { useState, useLayoutEffect, useRef, useEffect, useMemo } from 'react';
import styles from './GlobalNav.module.scss';
import { NavMenuLink } from './components/NavMenuLink';
import { MobileNav } from './components/MobileNav';
import { DevCenterLogo } from './components/icons';

export interface NavMenuItem {
  type: 'DEFAULT' | 'EXTERNAL' | 'ICON';
  label: string;
  url: string;
  order: number;
  placement: 'LEFT' | 'RIGHT';
  icon?: string;
}

interface NavProps {
  leftLinks: NavMenuItem[];
  rightLinks: NavMenuItem[];
  currentSite: string;
  secondaryNavDesktop?: JSX.Element;
  secondaryNavMobile?: JSX.Element;
}

function throttleResize(resizeFunction, throttle) {
  let timeoutId;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(resizeFunction, throttle);
  };
}

export function GlobalNav({
  currentSite,
  leftLinks,
  rightLinks,
  secondaryNavDesktop,
  secondaryNavMobile,
}: NavProps) {
  const themeableSites: any = {
    'UI Library': true,
  };

  const BEST_BREAKPOINT_GUESS = 1200;
  // This class will be added onto the sites that aren't using an Amplify UI theme provider, this will let those using a ThemeProvider use the variables
  // provided and the sites not using a ThemeProvider will have the needed variables added on
  const themeClass = themeableSites[currentSite] ? '' : 'use-ui-theme';

  let hasSecondaryNav = !!(secondaryNavDesktop && secondaryNavMobile);

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
  const allLinks = useMemo(() => {
    return [...leftLinks, ...rightLinks];
  }, [leftLinks, rightLinks]);

  const navLinksContainerRef = useRef<HTMLDivElement>(null);
  const navLinksRightRef = useRef<HTMLDivElement>(null);

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
  }, []);

  useLayoutEffect(() => {
    if (currentWindowInnerWidth > mobileNavBreakpoint) {
      setIsMobileState(false);
    }
  }, [currentWindowInnerWidth, mobileNavBreakpoint]);

  return (
    <View
      id="main-nav"
      className={`${styles.navbar} ${styles[themeClass]}`}
      aria-label="Amplify Dev Center Global"
      as="nav"
    >
      {isMobileState ? (
        <MobileNav
          allLinks={allLinks}
          hasSecondaryNav={hasSecondaryNav}
          currentSite={currentSite}
          secondaryNavMobile={secondaryNavMobile}
        />
      ) : (
        <>
          <Flex
            ref={navLinksContainerRef}
            className={styles['nav-links-container']}
            padding="0px 32px"
            style={{
              borderBottom: hasSecondaryNav ? '1px solid #d5dbdb' : 'none',
            }}
          >
            <Flex
              columnStart="1"
              height="100%"
              columnGap="16px"
              alignItems="center"
              id="left-nav"
            >
              {/* Left side of nav bar */}
              <Flex height="100%" columnGap="8px" alignItems="center">
                <DevCenterLogo />
                <Text className={styles['dev-center-logo']}>
                  <span style={{ fontWeight: '400' }}>Amplify</span>{' '}
                  <span style={{ fontWeight: '300' }}>Dev Center</span>
                </Text>
              </Flex>
              {leftLinks.map((link) => (
                <NavMenuLink
                  navMenuItem={link}
                  currentMenuItem={currentSite}
                  key={link.order}
                />
              ))}
            </Flex>
            <Flex
              ref={navLinksRightRef}
              columnStart="3"
              columnGap="16px"
              alignItems="center"
              id="right-nav"
            >
              {rightLinks.map((link) => (
                <NavMenuLink
                  navMenuItem={link}
                  currentMenuItem={currentSite}
                  key={link.order}
                />
              ))}
            </Flex>
          </Flex>
          {secondaryNavDesktop}
        </>
      )}
    </View>
  );
}
