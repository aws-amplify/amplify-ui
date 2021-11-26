import * as React from 'react';
import { useRouter } from 'next/router';
import { Sandpack } from '@codesandbox/sandpack-react';
import {
  Link,
  Grid,
  Authenticator,
  Button,
  Card,
  TextField,
  Heading,
  View,
  Text,
  Flex,
  Image,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
  IconChevronRight,
} from '@aws-amplify/ui-react';

import { HomeLogo } from './HomeLogo';
import { ThemeButton } from './ThemeButton';
import { HomePrimitivePreview } from './HomePrimitivePreview';
import { Copy } from '@/components/Copy';
import { Footer } from '@/components/Layout/Footer';

const code = `import { AmplifyProvider, Button, Card, Text, Heading, Flex, Badge, createTheme, Image, View, StepperField, Rating, useTheme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { theme } from './theme';

const Example = () => {
  const { tokens } = useTheme();
  return (
    <Card>
      <Flex direction="row" alignItems="flex-start">
        <Image src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=930&q=80"
          width="8rem"/>
        <Flex direction="column" gap={tokens.space.xs}>
          <Flex direction="row">
            <Badge variation="success">New</Badge>
          </Flex>
          <Heading level={3}>
            Product title
          </Heading>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque risus in sem dapibus, nec vestibulum metus mattis. Mauris dignissim maximus tellus, in feugiat nibh rhoncus a.</Text>
          <Flex direction="row" alignItems="center">
            <Text
              fontSize={tokens.fontSizes.large}
              color={tokens.colors.font.secondary}>
              $199.99
            </Text>
            <StepperField
              label="Stepper"
              defaultValue={1}
              min={0}
              max={10}
              step={1}
              labelHidden
            />
            <Button variation="primary">Add to cart</Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default function App() {
  return (
    <AmplifyProvider theme={theme}>
      <Example />
    </AmplifyProvider>
  )
}`;

const themeCode = `export const theme = {
  name: 'my-theme',
  // customizations
  // tokens: {
  //   colors: {
  //     font: {
  //       secondary: { value: 'hotpink' }
  //     }
  //   }
  // }
};`;

const AmpCard = ({ title, description, href }) => (
  <Link isExternal href={href} className="docs-home-amp-product-card">
    <Card textAlign="center" variation="outlined">
      <Heading level={3}>{title}</Heading>
      <Text>{description}</Text>
    </Card>
  </Link>
);

const HomePage = ({ colorMode, setThemeOverride, themeOverride }) => {
  const router = useRouter();
  const { tokens } = useTheme();
  const framework = router.query.platform ?? 'react';
  const sandPackTheme = {
    palette: {
      activeText: `${tokens.colors.font.interactive}`,
      defaultText: `${tokens.colors.font.secondary}`,
      // this is also used as the border color in sandpack
      inactiveText: `${tokens.colors.border.primary}`,
      activeBackground: `${tokens.colors.overlay[10]}`,
      defaultBackground: `${tokens.colors.background.primary}`,
      inputBackground: `${tokens.colors.background.primary}`,
      accent: `${tokens.colors.border.focus}`,
      errorBackground: `${tokens.colors.background.error}`,
      errorForeground: `${tokens.colors.font.error}`,
    },
    syntax: {
      plain: `${tokens.colors.font.primary}`,
      comment: {
        color: `${tokens.colors.font.tertiary}`,
        fontStyle: 'italic',
      },
      keyword: `${tokens.colors.red[80]}`,
      tag: `${tokens.colors.orange[80]}`,
      punctuation: `${tokens.colors.blue[80]}`,
      definition: `${tokens.colors.teal[80]}`,
      property: `${tokens.colors.purple[90]}`,
      static: `${tokens.colors.pink[90]}`,
      string: `${tokens.colors.green[90]}`,
    },
    typography: {
      bodyFont:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      monoFont:
        '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
      fontSize: '16px',
      lineHeight: '1.5',
    },
  };
  return (
    <>
      <View as="section" className="docs-home-section-bg">
        <HomeLogo />
        <Image
          alt=""
          className="docs-home-vue"
          src="/svg/integrations/vue.svg"
        />
        <Image
          alt=""
          className="docs-home-react"
          src="/svg/integrations/react.svg"
        />
        <Image
          alt=""
          className="docs-home-angular"
          src="/svg/integrations/angular.svg"
        />
        <Card padding={tokens.space.xl} variation="outlined">
          <Text fontSize={tokens.fontSizes.xl}>
            Amplify UI is an open-source design system with cloud-connected
            components and primitives that simplify building accessible,
            performant, and beautiful applications in React, Angular, and Vue
            (more coming soon).
          </Text>

          <Flex
            direction={{ base: 'column-reverse', medium: 'row' }}
            padding={`${tokens.space.medium} 0 0 0`}
          >
            <Button
              size="large"
              variation="primary"
              as="a"
              href="/getting-started/installation"
            >
              Get started
              <IconChevronRight />
            </Button>
            <TextField
              label=""
              labelHidden={true}
              isReadOnly={true}
              className="install-code"
              outerEndComponent={
                <Copy
                  variation="link"
                  text={`npm i @aws-amplify/ui-${framework} aws-amplify`}
                />
              }
              value={`npm i @aws-amplify/ui-${framework} aws-amplify`}
            />
          </Flex>
        </Card>
      </View>
      <View
        backgroundColor={tokens.colors.background.secondary}
        padding={tokens.space.xl}
      >
        <Heading level={2} textAlign="center" margin={tokens.space.xl}>
          Take it for a test drive
        </Heading>
        <Card style={{ width: '100%', padding: 0 }} variation="outlined">
          <Sandpack
            template="react"
            files={{
              '/App.js': { code: code, active: true },
              '/theme.js': { code: themeCode },
            }}
            theme={sandPackTheme}
            options={{
              editorHeight: 500,
              showNavigator: true, // this will show a top navigator bar instead of the refresh button
              showTabs: true, // you can toggle the tabs on/off manually
              showLineNumbers: true, // this is off by default, but you can show line numbers for the editor
              wrapContent: true, // also off by default, this wraps the code instead of creating horizontal overflow
            }}
            customSetup={{
              dependencies: {
                '@aws-amplify/ui-react': 'next',
                'aws-amplify': 'latest',
              },
              entry: '/index.js',
            }}
          />
        </Card>
      </View>

      <View as="section" className="docs-home-section">
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
            <Button as="a" size="large" href="/components/authenticator">
              Authenticator
              <IconChevronRight />
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
          direction={{
            base: 'column',
            large: 'row',
          }}
        >
          <Flex flex="1" direction="column" alignItems="flex-start">
            <Heading level={2}>Theming</Heading>
            <Text className="docs-home-description">
              Theming capabilities that allow you to customize the appearance of
              Amplify UI to match your brand.
            </Text>
            <Button as="a" size="large" href="/theming">
              Get started with theming
              <IconChevronRight />
            </Button>
          </Flex>
          <Flex
            flex="1"
            alignContent="center"
            padding={{
              base: '0',
              large: tokens.space.xl,
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
          direction={{
            base: 'column',
            large: 'row',
          }}
        >
          <View maxWidth="100%" overflow="hidden">
            <HomePrimitivePreview />
          </View>
          <Flex flex="1" direction="column" alignItems="flex-start">
            <Heading level={2}>Primitive Components</Heading>
            <Text className="docs-home-description">
              Primitive components that create consistency across Amplify UI and
              allow you to build complete applications that fit your brand, like
              Buttons and Badges.
            </Text>
            <Button as="a" size="large" href="/components/authenticator">
              Get started with components
              <IconChevronRight />
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
              <Link isExternal href="https://www.w3.org/TR/wai-aria-1.2/">
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
        <Heading level={2} textAlign="center" margin={tokens.space.xl}>
          Looking for other Amplify Products?
        </Heading>
        <Grid
          templateColumns="1fr 1fr"
          templateRows="1fr 1fr 1fr"
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
            href="https://docs.amplify.aws/console/adminui/intro/"
            title="Amplify Admin"
            description="Visually configure and manage your app backend."
          />
        </Grid>
      </View>
      <Footer />
    </>
  );
};

export default HomePage;
