import { Button, Text, Link } from '@aws-amplify/ui-react';
import { Dispatch, SetStateAction } from 'react';
import styles from '../GlobalNav.module.scss';
import { IconLink, ExternalLink } from '.';
import { NavMenuItem } from '../GlobalNav';
import { ShowSecondaryNav } from './secondary-nav-components';

export function NavMenuLink({
  navMenuItem,
  currentMenuItem = '',
  hasSecondaryNav = false,
  isMobile = false,
  setShowGlobalNav,
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
      <IconLink iconType={navMenuItem.icon ? navMenuItem.icon : ''} />
    );
  const showSecondaryNav = hasSecondaryNav && label === currentMenuItem;

  if (navMenuItem.type === 'DEFAULT') {
    if (isMobile) {
      return showSecondaryNav ? (
        <ShowSecondaryNav label={label} setShowGlobalNav={setShowGlobalNav} />
      ) : (
        <Link className={styles['nav-menu-item']} href={navMenuItem.url}>
          <Text
            as="span"
            padding="2px 10px"
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
    }
  } else {
    return (
      <Link
        target="_blank"
        rel="noopener noreferrer"
        className={styles['nav-menu-item']}
        href={navMenuItem.url}
      >
        <Text as="span" padding="2px 10px">
          {linkContent}
        </Text>
      </Link>
    );
  }
}
