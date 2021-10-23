import { useState } from 'react';
import Link from 'next/link';
import {
  Icon,
  IconChevronRight,
  IconNotStarted,
  IconWidgets,
  IconDeviceHub,
  SearchField,
  View,
  Heading,
  Button,
  IconSearch,
  Flex,
  ColorMode,
  ToggleButton,
  ToggleButtonGroup,
  IconWbSunny,
  IconWbTwighlight,
  IconComputer,
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { Logo } from '@/components/Logo';
import { FrameworkChooser } from './FrameworkChooser';

const NavLink = ({ href, children }) => {
  const router = useRouter();
  const isCurrent = router.pathname.startsWith(href);

  return (
    <Link href={href}>
      <a className={`docs-nav-link ${isCurrent ? 'current' : ''}`}>
        {children}
      </a>
    </Link>
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
    <header className="docs-header">
      <Link href="/">
        <a className="docs-logo-link">
          <Logo />
        </a>
      </Link>

      <nav className="docs-nav">
        <NavLink href="/getting-started">Getting started</NavLink>
        <NavLink href="/ui/primitives">Components</NavLink>
        <NavLink href="/ui/theming">Theming</NavLink>
      </nav>
      <Flex direction="row" alignItems="center">
        <Button variation="primary" size="small">
          <IconSearch />
        </Button>
        <FrameworkChooser platform={platform} />
        <ColorModeSwitcher setColorMode={setColorMode} colorMode={colorMode} />
      </Flex>
    </header>
  );
};
