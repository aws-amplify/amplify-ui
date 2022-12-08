import { View, Flex } from '@aws-amplify/ui-react';
import { NavMenuLink } from './NavMenuLink';
import styles from '../GlobalNav.module.scss';
import { NavMenuItem } from '../GlobalNav';

interface LeftNavLinksProps {
  leftLinks: NavMenuItem[];
  isCollapsed: boolean;
  currentSite: string;
}

export function LeftNavLinks({
  isCollapsed,
  leftLinks,
  currentSite,
}: LeftNavLinksProps) {
  return (
    <Flex
      className={`${styles['left-nav-links']} ${
        isCollapsed ? styles['collapsed-menu'] : ''
      }`}
    >
      {leftLinks.map((link) => (
        <View className={styles['mobile-border']} key={link.order}>
          <NavMenuLink navMenuItem={link} currentMenuItem={currentSite} />
        </View>
      ))}
    </Flex>
  );
}
