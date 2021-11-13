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
  IconWbTwighlight,
  IconComputer,
  IconMenu,
  Divider,
  useTheme,
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { Logo } from '@/components/Logo';
import { FrameworkChooser } from './FrameworkChooser';

const NavLink = ({ href, children, isExternal = false }) => {
  const router = useRouter();
  const isCurrent = router.pathname.startsWith(href);
  const className = `docs-nav-link ${isCurrent ? 'current' : ''}`;

  if (isExternal) {
    return (
      <Link isExternal className={className}>
        {children}
      </Link>
    );
  }
  return (
    <NextLink href={href}>
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
        <IconWbTwighlight />
      </ToggleButton>
      <ToggleButton value="system">
        <VisuallyHidden>System preference</VisuallyHidden>
        <IconComputer />
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
          <NextLink href="/">
            <a className="docs-logo-link">
              <VisuallyHidden>Amplify UI Home</VisuallyHidden>
              <Logo />
            </a>
          </NextLink>

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
