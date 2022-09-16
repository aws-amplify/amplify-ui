import { useState, useMemo } from 'react';
import {
  View,
  Text,
  Button,
  Flex,
  VisuallyHidden,
} from '@aws-amplify/ui-react';
import { ChevronIcon, DevCenterLogo } from './icons';
import { NavMenuLink } from './NavMenuLink';
import { NavMenuItem } from '../GlobalNav';
import { MobileSecondaryNav } from './secondary-nav-components';
import styles from '../GlobalNav.module.scss';

interface MobileNavProps {
  allLinks: NavMenuItem[];
  currentSite: string;
  hasSecondaryNav: boolean;
  secondaryNavMobile?: JSX.Element;
}

export function MobileNav({
  allLinks,
  currentSite,
  hasSecondaryNav,
  secondaryNavMobile,
}: MobileNavProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [showGlobalNav, setShowGlobalNav] = useState<boolean>(
    hasSecondaryNav ? false : true
  );

  const iconLinks: JSX.Element[] = useMemo(() => {
    return allLinks
      .filter((link) => link.type === 'ICON')
      .map((link) => (
        <View style={{ width: '100%' }} key={`${link.order}`}>
          <NavMenuLink navMenuItem={link} currentMenuItem={currentSite} />
        </View>
      ));
  }, [allLinks]);

  const mobileLinks: JSX.Element[] = useMemo(() => {
    return allLinks
      .filter((link) => link.type !== 'ICON')
      .map((link) => (
        <View className={styles['mobile-nav-menu-items']} key={`${link.order}`}>
          <NavMenuLink
            navMenuItem={link}
            currentMenuItem={currentSite}
            hasSecondaryNav={hasSecondaryNav}
            isMobile={true}
            setShowGlobalNav={setShowGlobalNav}
          />
        </View>
      ));
  }, [allLinks]);

  const chevronRotation = isCollapsed ? '0' : '180';

  return (
    <>
      <View className={styles['mobile-nav-container']} padding="0px 20px">
        <Flex columnGap="8px" alignItems="center">
          <DevCenterLogo />
          <Text className={styles['dev-center-logo']}>
            <span style={{ fontWeight: '400' }}>Amplify</span>{' '}
            <span style={{ fontWeight: '300' }}>Dev Center </span>
            <ChevronIcon rotateDeg="270" />
            <span style={{ fontWeight: '300' }}> {currentSite}</span>
          </Text>
        </Flex>
        <Button
          aria-expanded={!isCollapsed}
          aria-controls="mobile-nav-links"
          border="none"
          height="30px"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          <VisuallyHidden>
            {isCollapsed ? 'Open menu' : 'Close menu'}
          </VisuallyHidden>
          <ChevronIcon rotateDeg={chevronRotation} />
        </Button>
      </View>
      {isCollapsed ? (
        <></>
      ) : (
        <View id="mobile-nav-links">
          {showGlobalNav ? (
            <View className={styles['mobile-nav-menu-container']}>
              {mobileLinks}
              <View
                className={`${styles['mobile-nav-menu-items']} ${styles['mobile-nav-icons-container']}`}
              >
                {iconLinks}
              </View>
            </View>
          ) : (
            <MobileSecondaryNav
              secondaryNavMobile={secondaryNavMobile}
              setShowGlobalNav={setShowGlobalNav}
            />
          )}
        </View>
      )}
      {isCollapsed ? (
        <></>
      ) : (
        <View
          className={styles['background-overlay']}
          onClick={() => {
            setIsCollapsed(true);
          }}
        ></View>
      )}
    </>
  );
}
