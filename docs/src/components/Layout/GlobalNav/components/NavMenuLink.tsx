import { Button, Text } from '@aws-amplify/ui-react';
import { useContext } from 'react';
import styles from '../GlobalNav.module.scss';
import { IconLink, ExternalLink } from '.';
import { NavMenuItem, NavMobileContext } from '../GlobalNav';

export function NavMenuLink({
  navMenuItem,
  currentMenuItem = '',
  hasSecondaryNav = false,
  customKey,
  isMobile = false,
  themeClass,
}: {
  navMenuItem: NavMenuItem;
  currentMenuItem: string;
  hasSecondaryNav?: boolean;
  customKey?: string;
  isMobile?: boolean;
  themeClass: string;
}) {
  const { setShowGlobalNav } = useContext(NavMobileContext);

  let linkContent;

  switch (navMenuItem.type) {
    case 'EXTERNAL':
      linkContent = <ExternalLink>{navMenuItem.label}</ExternalLink>;
      break;
    case 'ICON':
      linkContent = (
        <IconLink iconType={navMenuItem.icon ? navMenuItem.icon : ''} />
      );
      break;
    default:
      linkContent = navMenuItem.label;
      break;
  }

  if (navMenuItem.type === 'DEFAULT') {
    if (isMobile) {
      return hasSecondaryNav && navMenuItem.label === currentMenuItem ? (
        <Button
          justifyContent="flex-start"
          isFullWidth={true}
          fontWeight="400"
          border="none"
          borderRadius="0"
          padding="12px"
          className={`${styles['secondary-nav-button']}`}
          {...(customKey ? { key: customKey } : {})}
          onClick={() => setShowGlobalNav(false)}
          ariaLabel={`Show ${linkContent} nav bar`}
        >
          {linkContent}
        </Button>
      ) : (
        <a
          className={`${styles['nav-menu-item']} ${styles[themeClass]}`}
          {...(customKey ? { key: customKey } : {})}
          href={navMenuItem.url}
        >
          <Text
            as="span"
            padding="2px 10px"
            className={
              navMenuItem.label === currentMenuItem
                ? styles['current-nav-menu-item']
                : ''
            }
          >
            {linkContent}
          </Text>
        </a>
      );
    } else {
      return (
        <a
          className={`${styles['nav-menu-item']} ${
            navMenuItem.label === currentMenuItem
              ? styles['current-nav-menu-item']
              : ''
          } ${styles[themeClass]}`}
          {...(customKey ? { key: customKey } : {})}
          href={navMenuItem.url}
        >
          {linkContent}
        </a>
      );
    }
  } else {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles['nav-menu-item']} ${styles[themeClass]}`}
        {...(customKey ? { key: customKey } : {})}
        href={navMenuItem.url}
      >
        {linkContent}
      </a>
    );
  }
}
