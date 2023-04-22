import { Text, Link } from '@aws-amplify/ui-react';
import styles from '../GlobalNav.module.scss';
import { IconLink, ExternalLink } from './icons';
import { NavMenuItem } from '../GlobalNav';

export function NavMenuLink({
  navMenuItem,
  currentMenuItem = '',
}: {
  navMenuItem: NavMenuItem;
  currentMenuItem: string;
}) {
  const { label } = navMenuItem;
  const linkContent: JSX.Element =
    navMenuItem.type === 'EXTERNAL' ? (
      <Text as="span" color="inherit">
        <ExternalLink>{label}</ExternalLink>
      </Text>
    ) : (
      <Text as="span" color="inherit" className={styles['icon-link']}>
        <IconLink iconType={navMenuItem.icon ? navMenuItem.icon : ''} />
      </Text>
    );

  if (navMenuItem.type === 'DEFAULT') {
    return (
      <Link className={`${styles['nav-menu-item']}`} href={navMenuItem.url}>
        <Text
          as="span"
          color="inherit"
          className={
            navMenuItem.label === currentMenuItem
              ? styles['current-nav-menu-item']
              : ''
          }
        >
          {label}
        </Text>
      </Link>
    );
  } else {
    return (
      <Link
        isExternal
        className={styles['nav-menu-item']}
        href={navMenuItem.url}
      >
        {linkContent}
      </Link>
    );
  }
}
