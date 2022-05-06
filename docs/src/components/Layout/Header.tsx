import * as React from 'react';

import {
  Button,
  ColorMode,
  Divider,
  Flex,
  Link,
  ToggleButton,
  ToggleButtonGroup,
  View,
  VisuallyHidden,
} from '@aws-amplify/ui-react';
import {
  MdBedtime,
  MdClose,
  MdMenu,
  MdOpenInNew,
  MdTonality,
  MdWbSunny,
} from 'react-icons/md';

import { FrameworkChooser } from './FrameworkChooser';
import LinkButton from './LinkButton';
import { Logo } from '@/components/Logo';
import NextLink from 'next/link';
import { SecondaryNav } from './SecondaryNav';
import { useRouter } from 'next/router';

const NavLink = ({
  href,
  children,
  isExternal = false,
  onClick,
}: {
  href: string;
  children: React.ReactElement;
  isExternal?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  const { pathname, asPath } = useRouter();

  const isCurrent = asPath.startsWith(href) && href !== '/';
  const className = `docs-nav-link ${isCurrent ? 'current' : ''}`;

  if (isExternal) {
    return (
      <Link isExternal href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <NextLink href={href} passHref>
      <LinkButton href={href} classNames={className} onClick={onClick}>
        {children}
      </LinkButton>
    </NextLink>
  );
};

const Nav = (props) => (
  <Flex as="nav" className="docs-nav" alignItems="center" gap="0" grow="1">
    <NavLink
      {...props}
      href={`/getting-started/installation/${props.platform}`}
    >
      Getting started
    </NavLink>
    <NavLink {...props} href={`/components/${props.platform}`}>
      Components
    </NavLink>
    <NavLink {...props} href={`/theming/${props.platform}`}>
      Theming
    </NavLink>
    <NavLink {...props} href={`/guides/${props.platform}`}>
      Guides
    </NavLink>
    <Divider orientation="vertical" />
    <NavLink {...props} isExternal href="https://docs.amplify.aws">
      Amplify docs <MdOpenInNew />
    </NavLink>
  </Flex>
);

const Settings = ({ platform, setColorMode, colorMode }) => (
  <Flex className="docs-settings" justifyContent="center" alignItems="center">
    <FrameworkChooser platform={platform} />
    <ColorModeSwitcher setColorMode={setColorMode} colorMode={colorMode} />
  </Flex>
);

const ColorModeSwitcher = ({ colorMode, setColorMode }) => {
  return (
    <ToggleButtonGroup
      value={colorMode}
      size="small"
      onChange={(value: ColorMode) => setColorMode(value)}
      isExclusive
      isSelectionRequired
      className="color-switcher"
    >
      <ToggleButton value="light" title="Light mode">
        <VisuallyHidden>Light mode</VisuallyHidden>
        <MdWbSunny />
      </ToggleButton>
      <ToggleButton value="dark" title="Dark mode">
        <VisuallyHidden>Dark mode</VisuallyHidden>
        <MdBedtime />
      </ToggleButton>
      <ToggleButton value="system" title="System preferences">
        <VisuallyHidden>System preference</VisuallyHidden>
        <MdTonality />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const Header = ({ platform, colorMode, setColorMode }) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <>
      <header className={`docs-header ${expanded ? 'expanded' : ''}`}>
        <Button
          className="docs-header-menu-button"
          onClick={() => setExpanded(!expanded)}
          ariaLabel="Docs header menu button"
        >
          {expanded ? (
            <MdClose style={{ width: '1.5rem', height: '1.5rem' }} />
          ) : (
            <MdMenu style={{ width: '1.5rem', height: '1.5rem' }} />
          )}
        </Button>

        <NavLink href={`/${platform}`}>
          <span className="docs-logo-link">
            <VisuallyHidden>Amplify UI Home</VisuallyHidden>
            <Logo />
          </span>
        </NavLink>

        <Nav platform={platform} />

        <Settings
          colorMode={colorMode}
          setColorMode={setColorMode}
          platform={platform}
        />
      </header>
      {expanded ? (
        <View className="docs-header-mobile-nav">
          <Flex
            className="color-switcher__wrapper"
            justifyContent="center"
            alignItems="center"
          >
            <ColorModeSwitcher
              setColorMode={setColorMode}
              colorMode={colorMode}
            />
          </Flex>

          <Nav onClick={() => setExpanded(false)} platform={platform} />
          <nav className="docs-sidebar-nav">
            <SecondaryNav onClick={() => setExpanded(false)} />
          </nav>
        </View>
      ) : null}
    </>
  );
};
