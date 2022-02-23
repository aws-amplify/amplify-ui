import * as React from 'react';
import { useRouter } from 'next/router';
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
import { HomeEditor } from './HomeEdtior';
import { Copy } from '@/components/Copy';
import { Footer } from '@/components/Layout/Footer';

const AmpCard = ({ title, description, href }) => (
  <Link isExternal href={href} className="docs-home-amp-product-card">
    <Card textAlign="center" variation="outlined">
      <Heading level={3}>{title}</Heading>
      <Text>{description}</Text>
    </Card>
  </Link>
);

const HomePage = ({ setThemeOverride, themeOverride }) => {
  const router = useRouter();
  const { tokens } = useTheme();
  const framework = router.query.platform ?? 'react';

  return (
    <>
      <View as="section" className="docs-home-section-bg container">
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
        <View className="container">
          <Card style={{ width: '100%', padding: 0 }} variation="outlined">
            <HomeEditor />
          </Card>
        </View>
      </View>

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
          className="container"
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
          className="container"
          templateColumns={{ base: '1fr', medium: '1fr 1fr' }}
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
            href="https://docs.amplify.aws/console/"
            title="Amplify Studio"
            description="Visual development environment to accelerate full-stack development."
          />
        </Grid>
      </View>
      <Footer />
    </>
  );
};

export default HomePage;
