import {
  Button,
  Flex,
  Icon,
  Text,
  View,
  VisuallyHidden,
} from '@aws-amplify/ui-react';
import {
  createContext,
  useMemo,
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
} from 'react';
import styles from './GlobalNav.module.scss';
import { NavMenuLink } from './components/NavMenuLink';
import { ChevronIcon } from './components/icons';

export interface NavMenuItem {
  type: 'DEFAULT' | 'EXTERNAL' | 'ICON';
  label: string;
  url: string;
  order: number;
  placement: 'LEFT' | 'RIGHT';
  icon?: string;
}

interface NavProps {
  links: NavMenuItem[];
  currentSite: string;
  secondaryNavDesktop?: JSX.Element;
  secondaryNavMobile?: JSX.Element;
  setIsMobileState?: any;
}

type NavMobileContextType = {
  showGlobalNav: boolean;
  setShowGlobalNav: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavMobileContext = createContext<NavMobileContextType>({
  showGlobalNav: false,
  setShowGlobalNav: () => ({}),
});

export function GlobalNav({
  links,
  currentSite,
  secondaryNavDesktop,
  secondaryNavMobile,
}: NavProps) {
  let hasSecondaryNav = false;

  if (secondaryNavDesktop && secondaryNavMobile) {
    hasSecondaryNav = true;
  }

  const leftLinks: NavMenuItem[] = links.filter((e) => e.placement === 'LEFT');
  const rightLinks: NavMenuItem[] = links.filter(
    (e) => e.placement === 'RIGHT'
  );

  leftLinks.sort((a, b) => a.order - b.order);
  rightLinks.sort((a, b) => a.order - b.order);

  let windowInnerWidth;
  if (typeof window === 'undefined') {
    windowInnerWidth = 0;
  } else {
    windowInnerWidth = window.innerWidth;
  }

  const [isMobileState, setIsMobileState] = useState(false);
  const [mobileNavBreakpoint, setMobileNavBreakpoint] = useState(0);
  const [currentWindowInnerWidth, setCurrentWindowInnerWidth] =
    useState(windowInnerWidth);

  const navLinksContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navLinksContainerRef.current !== null) {
      if (
        navLinksContainerRef.current.scrollWidth >
        navLinksContainerRef.current.clientWidth
      ) {
        setIsMobileState(true);
        setMobileNavBreakpoint(window.innerWidth);
      }
    }

    const handleWindowSizeChange = () => {
      setCurrentWindowInnerWidth(window.innerWidth);

      if (navLinksContainerRef.current !== null) {
        if (
          navLinksContainerRef.current.scrollWidth >
          navLinksContainerRef.current.clientWidth
        ) {
          setIsMobileState(true);
          setMobileNavBreakpoint(window.innerWidth);
        }
      }
    };

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useLayoutEffect(() => {
    if (currentWindowInnerWidth > mobileNavBreakpoint) {
      setIsMobileState(false);
    }
  }, [currentWindowInnerWidth, mobileNavBreakpoint]);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showGlobalNav, setShowGlobalNav] = useState(
    hasSecondaryNav ? false : true
  );

  const value = useMemo(
    () => ({ showGlobalNav, setShowGlobalNav }),
    [showGlobalNav]
  );

  return isMobileState ? (
    <NavMobileContext.Provider value={value}>
      <nav className={styles.navbar}>
        <View className={styles['mobile-nav-container']} padding="0px 32px">
          <Flex columnGap="8px" alignItems="center">
            <Icon
              ariaLabel="Amplify Dev Center logo"
              width="24"
              height="22"
              viewBox={{ width: 24, height: 22 }}
              pathData="M20.6144 19L10.1205 1H13.5019L24 19H20.6144ZM7.80721 5.3588L15.4882 19H18.7952L9.45719 2.42859L7.80721 5.3588ZM4.89082 10.5419L0 19H13.8795L12.1271 15.9696H5.2705L8.70006 10.043L6.94038 7L4.89082 10.5419Z"
              fr={undefined}
              fill="#FF9900"
            />
            <Text className={styles['dev-center-logo']}>
              <span style={{ fontWeight: '400' }}>Amplify</span>{' '}
              <span style={{ fontWeight: '300' }}>{currentSite}</span>
            </Text>
          </Flex>
          <Button
            border="none"
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
          >
            <VisuallyHidden>
              {isCollapsed ? 'Open menu' : 'Close menu'}
            </VisuallyHidden>
            {isCollapsed ? (
              <ChevronIcon rotateDeg="0" />
            ) : (
              <ChevronIcon rotateDeg="180" />
            )}
          </Button>
        </View>
        {isCollapsed ? (
          <></>
        ) : (
          <>
            {showGlobalNav ? (
              <View className={styles['mobile-nav-menu-container']}>
                {links
                  .filter((link) => link.type !== 'ICON')
                  .map((link) => (
                    <View
                      className={styles['mobile-nav-menu-items']}
                      key={`${link.order}`}
                    >
                      <NavMenuLink
                        navMenuItem={link}
                        currentMenuItem={currentSite}
                        hasSecondaryNav={hasSecondaryNav}
                        isMobile={true}
                      />
                    </View>
                  ))}
                <View
                  className={`${styles['mobile-nav-menu-items']} ${styles['mobile-nav-icons-container']}`}
                >
                  {links
                    .filter((link) => link.type === 'ICON')
                    .map((link) => (
                      <View style={{ width: '100%' }} key={`${link.order}`}>
                        <NavMenuLink
                          navMenuItem={link}
                          currentMenuItem={currentSite}
                        />
                      </View>
                    ))}
                </View>
              </View>
            ) : (
              <Flex
                position="absolute"
                direction="column"
                width="100%"
                backgroundColor="white"
                style={{ zIndex: 100 }}
                rowGap="0px"
              >
                <Button
                  onClick={() => setShowGlobalNav(true)}
                  justifyContent="flex-start"
                  fontWeight="400"
                  padding="12px"
                  alignItems="center"
                  borderRadius="0px"
                  columnGap="9px"
                  className={`${styles['back-nav-button']}`}
                  ariaLabel={`Back to nav button`}
                >
                  <VisuallyHidden>Learn</VisuallyHidden>
                  <Icon
                    viewBox={{ minX: 4, minY: 0, width: 16, height: 18 }}
                    pathData="M13.4102 5.41L8.83016 10L13.4102 14.59L12.0002 16L6.00016 10L12.0002 4L13.4102 5.41Z"
                    ariaLabel="Icon to"
                    fr={undefined}
                  />
                  <Text>All Amplify sites</Text>
                </Button>
                {secondaryNavMobile}
              </Flex>
            )}
          </>
        )}
      </nav>
      {isCollapsed ? (
        <></>
      ) : (
        <View
          ariaLabel="Nav bar overlay"
          height="100vh"
          width="100vw"
          position="fixed"
          top="0"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 150 }}
          onClick={() => {
            setIsCollapsed(true);
          }}
        ></View>
      )}
    </NavMobileContext.Provider>
  ) : (
    <nav
      id="main-nav"
      className={`${styles.navbar}`}
      aria-label="Amplify Dev Center Global"
    >
      <Flex
        ref={navLinksContainerRef}
        id="nav-links-container"
        height="80px"
        alignItems="center"
        justifyContent="space-between"
        padding={{
          base: '0px 18px',
          small: '0px 18px',
          medium: '0px 18px',
          large: '0px 18px',
          xl: '0px 32px',
        }}
        style={{
          overflowY: 'scroll',
          borderBottom: '1px solid #d5dbdb',
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
            {/* Dev Center logo */}
            <Icon
              ariaLabel="Amplify Dev Center logo"
              width="24"
              height="22"
              viewBox={{ width: 24, height: 22 }}
              pathData="M20.6144 19L10.1205 1H13.5019L24 19H20.6144ZM7.80721 5.3588L15.4882 19H18.7952L9.45719 2.42859L7.80721 5.3588ZM4.89082 10.5419L0 19H13.8795L12.1271 15.9696H5.2705L8.70006 10.043L6.94038 7L4.89082 10.5419Z"
              fr={undefined}
              fill="#FF9900"
            />
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
    </nav>
  );
}
