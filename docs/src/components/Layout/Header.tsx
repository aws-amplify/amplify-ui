import { useState } from 'react';
import NextLink from 'next/link';
import {
  Icon,
  IconChevronRight,
  IconNotStarted,
  IconWidgets,
  IconDeviceHub,
  SearchField,
  IconOpenInNew,
  IconSettings,
  View,
  Heading,
  Button,
  IconSearch,
  Link,
  Flex,
  ColorMode,
  ToggleButton,
  ToggleButtonGroup,
  IconWbSunny,
  IconWbTwighlight,
  IconComputer,
  IconMenu,
  Alert,
  Divider
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { Logo } from '@/components/Logo';
import { FrameworkChooser } from './FrameworkChooser';
import { theme } from '../../pages/theme';

const NavLink = ({ href, children, isExternal }) => {
  const router = useRouter();
  const isCurrent = router.pathname.startsWith(href);

  return (
    <NextLink href={href}>
      <Link href={href} isExternal={isExternal} className={`docs-nav-link ${isCurrent ? 'current' : ''}`}>
      {children}
      </Link>
    </NextLink>
  );
};

const ColorModeSwitcher = ({ colorMode, setColorMode }) => {
  return (
    <ToggleButtonGroup
      value={colorMode}
      isExclusive
      size="small"
      onChange={(value: ColorMode) => setColorMode(value)}
    >
      <ToggleButton value="light">
        <IconWbSunny />
      </ToggleButton>
      <ToggleButton value="dark">
        <IconWbTwighlight />
      </ToggleButton>
      <ToggleButton value="system">
        <IconComputer />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const Header = ({ platform, colorMode, setColorMode }) => {
  return (
    <>
      <header className="docs-header">
        {/* <Alert variation="warning" isDismissible={true}>
          You're viewing documentation for the next release of Amplify UI. For the latest stable release, visit <a href="https://docs.amplify.aws/ui">https://docs.amplify.aws/ui</a>.
        </Alert> */}
        <Flex
          direction="row"
          alignItems="center"
          padding={`${theme.tokens.space.small} ${theme.tokens.space.xl}`}
        >
          <Button className="docs-header-menu-button" size="small">
            <IconMenu />
          </Button>
          <Link href="/">
            <a className="docs-logo-link">
              <Logo />
            </a>
          </Link>

          <Flex as="nav" className="docs-nav" gap="0">
            <NavLink href="/getting-started">Getting started</NavLink>
            <NavLink href="/components">Components</NavLink>
            <NavLink href="/theming">Theming</NavLink>
            <NavLink href="/examples">Examples</NavLink>
            <Divider orientation="vertical" />
            <NavLink isExternal href="https://docs.amplify.aws">Amplify docs <IconOpenInNew /></NavLink>
          </Flex>
          <Flex direction="row" alignItems="center">
            <Button variation="primary" size="small">
              <IconSearch />
            </Button>
            {/* <Button size="small">
              <IconSettings />
            </Button> */}
            <FrameworkChooser platform={platform} />
            <ColorModeSwitcher
              setColorMode={setColorMode}
              colorMode={colorMode}
            />
          </Flex>
        </Flex>
        {/* <Button className="docs-amplify-fab" variation="primary" as="a" href="https://docs.amplify.aws">
          All amplify
          <IconOpenInNew size="large" />
        </Button> */}
      </header>
    </>
  );
};
