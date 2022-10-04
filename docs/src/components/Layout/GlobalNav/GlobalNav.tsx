import { View } from '@aws-amplify/ui-react';
import { useRef, useMemo } from 'react';
import styles from './GlobalNav.module.scss';
import { MobileNav } from './components/MobileNav';
import { NavMenuIconType } from './components/IconLink';
import { DesktopNav } from './components/DesktopNav';
import { useNavLinksCollision } from './hooks/useNavLinksCollision';

export enum NavMenuItemType {
  DEFAULT = 'DEFAULT',
  EXTERNAL = 'EXTERNAL',
  ICON = 'ICON',
}

export interface NavMenuItem {
  type: NavMenuItemType;
  label: string;
  url: string;
  order: number;
  icon?: NavMenuIconType | string;
}

export interface NavProps {
  leftLinks: NavMenuItem[];
  rightLinks: NavMenuItem[];
  currentSite: string;
  secondaryNavDesktop?: JSX.Element;
  secondaryNavMobile?: JSX.Element;
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

  // This class will be added onto the sites that aren't using an Amplify UI theme provider, this will let those using a ThemeProvider use the variables
  // provided and the sites not using a ThemeProvider will have the needed variables added on
  const themeClass = themeableSites[currentSite] ? '' : 'use-ui-theme';

  let hasSecondaryNav =
    secondaryNavDesktop && secondaryNavMobile ? true : false;

  const navLinksContainerRef = useRef<HTMLDivElement>(null);
  const navLinksRightRef = useRef<HTMLDivElement>(null);

  const allLinks = useMemo(() => {
    return [...leftLinks, ...rightLinks];
  }, [leftLinks, rightLinks]);

  const isMobileState = useNavLinksCollision(
    navLinksContainerRef,
    navLinksRightRef
  );

  return (
    <View
      id="main-nav"
      className={`${styles.navbar} ${styles[themeClass]}`}
      aria-label="Amplify Dev Center - External links to additional Amplify resources"
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
        <DesktopNav
          currentSite={currentSite}
          leftLinks={leftLinks}
          rightLinks={rightLinks}
          navLinksContainerRef={navLinksContainerRef}
          navLinksRightRef={navLinksRightRef}
          hasSecondaryNav={hasSecondaryNav}
          secondaryNavDesktop={secondaryNavDesktop}
        />
      )}
    </View>
  );
}
