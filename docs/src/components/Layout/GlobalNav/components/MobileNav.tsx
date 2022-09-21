import { useState, useMemo } from 'react';
import {
  View,
  Text,
  Button,
  Flex,
  VisuallyHidden,
} from '@aws-amplify/ui-react';
import { ChevronIcon, AmplifyLogo } from './icons';
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
  }, [allLinks, currentSite]);

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
  }, [allLinks, currentSite, hasSecondaryNav]);

  const chevronRotation = isCollapsed ? '0' : '180';

  return (
    <>
      <View className={styles['mobile-nav-container']} padding="0 large">
        <Flex gap="xs" alignItems="center">
          <AmplifyLogo />
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
          backgroundColor="transparent"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          <VisuallyHidden>
            {isCollapsed ? 'Open Dev Center menu' : 'Close Dev Center menu'}
          </VisuallyHidden>
          <ChevronIcon rotateDeg={chevronRotation} />
        </Button>
      </View>
      {isCollapsed ? null : (
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
      {isCollapsed ? null : (
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
