import * as React from 'react';
import dynamic from 'next/dynamic';

import {
  ThemeProvider,
  Authenticator,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  ToggleButton,
  ToggleButtonGroup,
  View,
  useTheme,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import { MdChevronRight } from 'react-icons/md';

import { CopyButton } from '@/components/CopyButton';
import { Footer } from '@/components/Layout/Footer';
import { HomeLogo } from '../HomeLogo';
import { HomePrimitivePreview } from '../HomePrimitivePreview';
import { theme } from '../../theme';
import { ThemeButton } from '../ThemeButton';
import { useCustomRouter } from '@/components/useCustomRouter';
import { FRAMEWORKS } from '@/data/frameworks';

// react-live does not work with SSR so we have to load
// it dynamically and only in the client
const HomeEditor = dynamic(() => import('../HomeEditor'), { ssr: false });

const AmpCard = ({ title, description, href }) => (
  <Link isExternal href={href} className="docs-home-amp-product-card">
    <Card textAlign="center" variation="outlined">
      <Heading level={3}>{title}</Heading>
      <Text>{description}</Text>
    </Card>
  </Link>
);

const HomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();
  const { tokens } = useTheme();
  const [themeOverride, setThemeOverride] = React.useState('');
  const showEditor = useBreakpointValue({
    base: false,
    medium: true,
  });

  const installScripts = {
    react: `npm i @aws-amplify/ui-${platform} aws-amplify`,
    vue: `npm i @aws-amplify/ui-${platform} aws-amplify`,
    angular: `npm i @aws-amplify/ui-${platform} aws-amplify`,
    flutter: 'flutter pub add amplify_authenticator',
  };
  const frameworkInstallScript = installScripts[platform.toString()];
  return (
    <View data-amplify-theme-override={themeOverride}>
      <ThemeProvider theme={theme} colorMode={colorMode}>
        <View as="section" className="container">
          <h1 className="docs-home-logo">
            <HomeLogo />
          </h1>

          <Flex
            direction={{ base: 'column', medium: 'row' }}
            padding={tokens.space.large}
          >
            <Card variation="outlined" flex="1">
              <Text
                fontSize={{
                  base: tokens.fontSizes.large,
                  small: tokens.fontSizes.xl,
                }}
              >
                Amplify UI is an open-source design system with cloud-connected
                components and primitives that simplify building accessible,
                performant, and beautiful applications in React, Angular, Vue,
                and Flutter (more coming soon).
              </Text>

              <Flex
                direction={{ base: 'column-reverse', medium: 'row' }}
                padding={`${tokens.space.medium} 0 0 0`}
              >
                <Button
                  size="large"
                  variation="primary"
                  as="a"
                  href={`/${platform}/getting-started/installation`}
                >
                  Get started
                  <MdChevronRight />
                </Button>
                <code className="install-code__container">
                  <p className="install-code__content">
                    {frameworkInstallScript}
                  </p>
                  <CopyButton
                    className="install-code__button"
                    copyText={frameworkInstallScript}
                    variation="link"
                  />
                </code>
              </Flex>
            </Card>
            <Flex
              alignSelf="center"
              textAlign="center"
              flex="1"
              display={{ base: 'none', large: 'initial' }}
            >
              {FRAMEWORKS.map((framework) => (
                <Image
                  key={framework}
                  alt={`${framework} logo`}
                  className={`docs-home-${framework}`}
                  src={`/svg/integrations/${framework}.svg`}
                />
              ))}
            </Flex>
          </Flex>
        </View>
        {showEditor ? (
          <View
            backgroundColor={tokens.colors.background.secondary}
            padding={tokens.space.large}
          >
            <Heading level={2} textAlign="center" margin={tokens.space.large}>
              Take it for a test drive
            </Heading>
            <View className="container">
              <Card style={{ width: '100%', padding: 0 }} variation="outlined">
                <HomeEditor />
              </Card>
            </View>
          </View>
        ) : null}

        <View as="section" className="docs-home-section container">
          <Flex
            direction={{
              base: 'column-reverse',
              large: 'row',
            }}
          >
            <View flex="1" className="example">
              <Authenticator
                socialProviders={['amazon', 'apple', 'facebook', 'google']}
              />
            </View>
            <Flex flex="1" direction="column" alignItems="flex-start">
              <Heading level={2}>Cloud-Connected Components</Heading>
              <Text className="docs-home-description">
                Simplify complex cloud-connected workflows like authentication
                with minimal boilerplate code.
              </Text>
              <Button
                as="a"
                size="large"
                href={`/${platform}/components/authenticator`}
                isFullWidth
              >
                Authenticator
                <MdChevronRight />
              </Button>
            </Flex>
          </Flex>
        </View>

        <View
          as="section"
          className="docs-home-section"
          backgroundColor={tokens.colors.background.secondary}
        >
          <Flex
            className="container"
            direction={{
              base: 'column',
              large: 'row',
            }}
          >
            <Flex flex="1" direction="column" alignItems="flex-start">
              <Heading level={2}>Theming</Heading>
              <Text className="docs-home-description">
                Theming capabilities that allow you to customize the appearance
                of Amplify UI to match your brand.
              </Text>
              <Button as="a" size="large" href={`/${platform}/theming/`}>
                Get started with theming
                <MdChevronRight />
              </Button>
            </Flex>
            <Flex
              flex="1"
              alignContent="center"
              padding={{
                base: '0',
                large: tokens.space.large,
              }}
            >
              <ToggleButtonGroup
                width="100%"
                value={themeOverride}
                isExclusive
                onChange={(value: string) => setThemeOverride(value)}
              >
                <ToggleButton value="" flex="1">
                  <ThemeButton
                    label="Default"
                    colors={[
                      'var(--amplify-colors-teal-60)',
                      'var(--amplify-colors-purple-60)',
                    ]}
                  />
                </ToggleButton>
                <ToggleButton value="terminal" flex="1">
                  <ThemeButton label="Terminal" colors={['#44AF5B', '#000']} />
                </ToggleButton>
                <ToggleButton value="classic" flex="1">
                  <ThemeButton
                    label="Classic"
                    colors={[
                      'var(--amplify-colors-blue-60)',
                      'var(--amplify-colors-neutral-60)',
                    ]}
                  />
                </ToggleButton>
              </ToggleButtonGroup>
            </Flex>
          </Flex>
        </View>

        <View as="section" className="docs-home-section">
          <Flex
            className="container"
            direction={{
              base: 'column',
              large: 'row',
            }}
            gap={tokens.space.xxl}
          >
            <View maxWidth="100%" overflow="hidden">
              <HomePrimitivePreview />
            </View>
            <Flex flex="1" direction="column" alignItems="flex-start">
              <Heading level={2}>Primitive Components</Heading>
              <Text className="docs-home-description">
                Primitive components that create consistency across Amplify UI
                and allow you to build complete applications that fit your
                brand, like Buttons and Badges.
              </Text>
              <Button
                as="a"
                size="large"
                href={`/${platform}/components/authenticator`}
              >
                Get started with components
                <MdChevronRight />
              </Button>
            </Flex>
          </Flex>
        </View>

        <View
          as="section"
          className="docs-home-section"
          backgroundColor={tokens.colors.background.secondary}
        >
          <Flex
            className="container"
            direction={{
              base: 'column',
              large: 'row',
            }}
          >
            <View flex="1">
              <Heading level={2}>Accessibility</Heading>
              <Text className="docs-home-description">
                Amplify UI components follow{' '}
                <Link
                  isExternal
                  href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                >
                  WCAG
                </Link>{' '}
                and{' '}
                <Link isExternal href="https://www.w3.org/WAI/ARIA/apg/">
                  WAI-ARIA
                </Link>{' '}
                best practices and guidelines such as color contrast, keyboard
                navigation, accessible labels, and focus management.
              </Text>
            </View>
            <View flex="1"></View>
          </Flex>
        </View>

        <View as="section" className="docs-home-section">
          <Heading level={2} textAlign="center" margin={tokens.space.large}>
            Looking for other Amplify Products?
          </Heading>
          <Grid
            className="container"
            templateColumns={{ base: '1fr', medium: '1fr 1fr' }}
            gap={tokens.space.medium}
            flex="1"
          >
            <AmpCard
              href="https://docs.amplify.aws/lib/q/platform/js/"
              title="Amplify Libraries"
              description="Connect app to new or existing AWS services (Cognito, S3, and more)."
            />
            <AmpCard
              href="https://docs.amplify.aws/cli/"
              title="Amplify CLI"
              description="Configure an app backend with a guided CLI workflow."
            />
            <AmpCard
              href="https://docs.amplify.aws/console/"
              title="Amplify Hosting"
              description="Fully managed web hosting with full-stack CI/CD."
            />
            <AmpCard
              href="https://docs.amplify.aws/console/"
              title="Amplify Studio"
              description="Visual development environment to accelerate full-stack development."
            />
          </Grid>
        </View>
        <Footer />
      </ThemeProvider>
    </View>
  );
};

export default HomePage;
