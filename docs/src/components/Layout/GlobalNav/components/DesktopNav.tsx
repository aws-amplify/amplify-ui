import { Flex, Text } from '@aws-amplify/ui-react';
import { AmplifyLogo } from './icons';
import { NavMenuLink } from './NavMenuLink';
import styles from '../GlobalNav.module.scss';
import { NavMenuItem } from '../GlobalNav';
import { MutableRefObject } from 'react';

interface DesktopNavProps {
  currentSite: string;
  leftLinks: NavMenuItem[];
  rightLinks: NavMenuItem[];
  navLinksContainerRef: MutableRefObject<HTMLDivElement>;
  navLinksRightRef: MutableRefObject<HTMLDivElement>;
  hasSecondaryNav: boolean;
  secondaryNavDesktop?: JSX.Element;
}

export function DesktopNav({
  currentSite,
  leftLinks,
  rightLinks,
  navLinksContainerRef,
  navLinksRightRef,
  hasSecondaryNav,
  secondaryNavDesktop,
}: DesktopNavProps) {
  return (
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
          <Flex height="100%" columnGap="8px" alignItems="center">
            <AmplifyLogo />
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
  );
}
