import * as React from 'react';
import NextLink from 'next/link';
import {
  Button,
  VisuallyHidden,
  Link,
  Flex,
  ColorMode,
  ToggleButton,
  ToggleButtonGroup,
  IconMenu,
  Divider,
  View,
  IconClose,
} from '@aws-amplify/ui-react';
import { FiMoon, FiSun, FiSliders, FiExternalLink } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { Logo } from '@/components/Logo';
import { FrameworkChooser } from './FrameworkChooser';
import { SecondaryNav } from './SecondaryNav';

const NavLink = ({ href, children, isExternal = false, onClick }) => {
  const { pathname, query } = useRouter();
  const isCurrent = pathname.startsWith(href) && href !== '/';
  const className = `docs-nav-link ${isCurrent ? 'current' : ''}`;

  if (isExternal) {
    return (
      <Link isExternal href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <NextLink href={{ pathname: href, query }}>
      <div>
        <a className={className} onClick={onClick}>
          {children}
        </a>
      </div>
    </NextLink>
  );
};

const Nav = (props) => (
  <Flex as="nav" className="docs-nav" alignItems="center" gap="0" grow="1">
    <NavLink {...props} href="/getting-started/installation">
      Getting started
    </NavLink>
    <NavLink {...props} href="/components">
      Components
    </NavLink>
    <NavLink {...props} href="/theming">
      Theming
    </NavLink>
    <Divider orientation="vertical" />
    <NavLink {...props} isExternal href="https://docs.amplify.aws">
      Amplify docs <FiExternalLink />
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
      isExclusive
      size="small"
      onChange={(value: ColorMode) => setColorMode(value)}
    >
      <ToggleButton value="light">
        <VisuallyHidden>Light mode</VisuallyHidden>
        <FiSun />
      </ToggleButton>
      <ToggleButton value="dark">
        <VisuallyHidden>Dark mode</VisuallyHidden>
        <FiMoon />
      </ToggleButton>
      <ToggleButton value="system">
        <VisuallyHidden>System preference</VisuallyHidden>
        <FiSliders />
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
        >
          {expanded ? <IconClose /> : <IconMenu />}
        </Button>

        <NavLink href="/">
          <span className="docs-logo-link">
            <VisuallyHidden>Amplify UI Home</VisuallyHidden>
            <Logo />
          </span>
        </NavLink>

        <Nav />

        <Settings
          colorMode={colorMode}
          setColorMode={setColorMode}
          platform={platform}
        />
      </header>
      {expanded ? (
        <View className="docs-header-mobile-nav">
          <Settings
            colorMode={colorMode}
            setColorMode={setColorMode}
            platform={platform}
          />
          <Nav onClick={() => setExpanded(false)} />
          <nav className="docs-sidebar-nav">
            <SecondaryNav onClick={() => setExpanded(false)} />
          </nav>
        </View>
      ) : null}
    </>
  );
};
