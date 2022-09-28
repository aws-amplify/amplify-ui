import { Flex, View } from '@aws-amplify/ui-react';
import styles from '../GlobalNav.module.scss';
import { NavMenuLink } from './NavMenuLink';
import { SocialNavLinks } from './SocialNavLinks';
import { NavMenuItem } from '../GlobalNav';

interface RightNavLinksProps {
  rightLinks: NavMenuItem[];
  socialLinks: NavMenuItem[];
  isCollapsed: boolean;
  currentSite: string;
}

export function RightNavLinks({
  rightLinks,
  isCollapsed,
  currentSite,
  socialLinks,
}: RightNavLinksProps) {
  return (
    <Flex
      id="right-nav"
      className={`${styles['right-nav-links']} ${
        isCollapsed ? styles['collapsed-menu'] : ''
      }`}
    >
      {rightLinks.map((link) => (
        <View className={styles['mobile-border']} key={link.order}>
          <NavMenuLink navMenuItem={link} currentMenuItem={currentSite} />
        </View>
      ))}
      <SocialNavLinks socialLinks={socialLinks} currentSite={currentSite} />
    </Flex>
  );
}
