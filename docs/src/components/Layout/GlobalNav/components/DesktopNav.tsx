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
      >
        <Flex height="100%" gap="medium" id="left-nav">
          <Flex gap="xs" alignItems="center">
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
          gap="medium"
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
