import { Flex, View } from '@aws-amplify/ui-react';
import styles from '../GlobalNav.module.scss';
import { NavMenuLink } from './NavMenuLink';
import { NavMenuItem } from '../GlobalNav';

interface SocialNavLinksProps {
  socialLinks: NavMenuItem[];
  currentSite: string;
}

export function SocialNavLinks({
  socialLinks,
  currentSite,
}: SocialNavLinksProps) {
  return (
    <Flex className={`${styles['mobile-border']} ${styles['social-links']}`}>
      {socialLinks.map((link) => (
        <View key={link.order}>
          <NavMenuLink navMenuItem={link} currentMenuItem={currentSite} />
        </View>
      ))}
    </Flex>
  );
}
