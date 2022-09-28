import { Flex } from '@aws-amplify/ui-react';
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
        <NavMenuLink
          navMenuItem={link}
          currentMenuItem={currentSite}
          key={link.order}
        />
      ))}
    </Flex>
  );
}
