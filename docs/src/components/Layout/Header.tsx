import NextLink from 'next/link';
import {
  IconOpenInNew,
  Button,
  VisuallyHidden,
  Link,
  Flex,
  ColorMode,
  ToggleButton,
  ToggleButtonGroup,
  IconWbSunny,
  IconBedtime,
  IconTonality,
  IconMenu,
  Divider,
  useTheme,
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { Logo } from '@/components/Logo';
import { FrameworkChooser } from './FrameworkChooser';

const NavLink = ({ href, children, isExternal = false }) => {
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
      <a className={className}>{children}</a>
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
        <VisuallyHidden>Light mode</VisuallyHidden>
        <IconWbSunny />
      </ToggleButton>
      <ToggleButton value="dark">
        <VisuallyHidden>Dark mode</VisuallyHidden>
        <IconBedtime />
      </ToggleButton>
      <ToggleButton value="system">
        <VisuallyHidden>System preference</VisuallyHidden>
        <IconTonality />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const Header = ({ platform, colorMode, setColorMode }) => {
  const { tokens } = useTheme();
  return (
    <>
      <header className="docs-header">
        <Flex
          direction="row"
          alignItems="center"
          padding={`${tokens.space.small} ${tokens.space.xl}`}
        >
          <Button className="docs-header-menu-button" size="small">
            <IconMenu />
          </Button>
          <NavLink href="/">
            <a className="docs-logo-link">
              <VisuallyHidden>Amplify UI Home</VisuallyHidden>
              <Logo />
            </a>
          </NavLink>

          <Flex as="nav" className="docs-nav" alignItems="center" gap="0">
            <NavLink href="/getting-started/installation">
              Getting started
            </NavLink>
            <NavLink href="/components">Components</NavLink>
            <NavLink href="/theming">Theming</NavLink>
            {/* <NavLink href="/examples">Examples</NavLink> */}
            <Divider orientation="vertical" />
            <NavLink isExternal href="https://docs.amplify.aws">
              Amplify docs <IconOpenInNew />
            </NavLink>
          </Flex>
          <Flex direction="row" alignItems="center">
            {/* <Button variation="primary" size="small">
              <IconSearch />
            </Button> */}
            <FrameworkChooser platform={platform} />
            <ColorModeSwitcher
              setColorMode={setColorMode}
              colorMode={colorMode}
            />
          </Flex>
        </Flex>
      </header>
    </>
  );
};
