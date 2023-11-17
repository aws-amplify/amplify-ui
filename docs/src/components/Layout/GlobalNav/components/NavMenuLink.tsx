import { Text, Link } from '@aws-amplify/ui-react';
import { Dispatch, SetStateAction } from 'react';
import styles from '../GlobalNav.module.scss';
import { IconLink, ExternalLink } from './icons';
import { NavMenuItem } from '../GlobalNav';

export function NavMenuLink({
  navMenuItem,
  currentMenuItem = '',
}: {
  navMenuItem: NavMenuItem;
  currentMenuItem: string;
  hasSecondaryNav?: boolean;
  isMobile?: boolean;
  setShowGlobalNav?: Dispatch<SetStateAction<boolean>>;
}) {
  const label: string = navMenuItem.label;
  const linkContent: JSX.Element =
    navMenuItem.type === 'EXTERNAL' ? (
      <ExternalLink>{label}</ExternalLink>
    ) : (
      <Text as="span" color="inherit" className={styles['icon-link']}>
        <IconLink iconType={navMenuItem.icon ? navMenuItem.icon : ''} />
      </Text>
    );

  if (navMenuItem.type === 'DEFAULT') {
    return (
      <Link
        className={`${styles['nav-menu-item']} ${
          navMenuItem.label === currentMenuItem
            ? styles['current-nav-menu-item']
            : ''
        }`}
        href={navMenuItem.url}
      >
        {label}
      </Link>
    );
  } else {
    return (
      <Link
        isExternal={true}
        className={styles['nav-menu-item']}
        href={navMenuItem.url}
      >
        {linkContent}
      </Link>
    );
  }
}
