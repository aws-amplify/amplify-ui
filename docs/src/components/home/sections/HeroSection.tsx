import NextLink from 'next/link';
import { Button, Flex, Heading, Icon, Text, View } from '@aws-amplify/ui-react';
import { MdChevronRight } from 'react-icons/md';
import {
  RiCloudWindyLine,
  RiDragDropLine,
  RiPencilRuler2Line,
} from 'react-icons/ri';
import { CopyButton } from '@/components/CopyButton';
import { useCustomRouter } from '@/components/useCustomRouter';
import { HomeFeatureCard } from '../HomeFeatureCard';
import { FRAMEWORKS } from '@/data/frameworks';
import { FrameworkLogo } from '@/components/Logo';

export const HeroSection = () => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  const installScripts = {
    react: `npm i @aws-amplify/ui-${platform} aws-amplify`,
    vue: `npm i @aws-amplify/ui-${platform} aws-amplify`,
    angular: `npm i @aws-amplify/ui-${platform} aws-amplify`,
    flutter: 'flutter pub add amplify_authenticator',
  };
  const frameworkInstallScript = installScripts[platform.toString()];

  return (
    <View as="section" className="docs-hero">
      <Flex justifyContent="center" textAlign="center">
        <Flex
          direction="column"
          className="docs-home-subsection--thin"
          alignItems="center"
        >
          <Heading level={1} marginBlockEnd="0">
            Don't just prototype. <br />
            <strong>Connect your UI to the cloud.</strong>
          </Heading>
          <Text
            fontSize={{
              base: 'large',
              small: 'xl',
            }}
          >
            Amplify UI is a collection of accessible, themeable, performant
            React{' '}
            <View as="span" display="inline-block">
              (and more!
              {FRAMEWORKS.map((framework) => (
                <NextLink key={framework} href={`/${framework}`} scroll={false}>
                  <a>
                    <FrameworkLogo
                      framework={framework}
                      marginInlineStart="xxs"
                    />
                  </a>
                </NextLink>
              ))}
              )
            </View>{' '}
            components that can connect directly to the cloud.
            {/* Visually compose and connect Amplify UI in Amplify Studio or code it up in your favorite IDE! */}
            {/* Amplify UI simplifies building accessible, performant, and beautiful
            applications with cloud-connected capabilities, building blocks,
            theming, and utilities. */}
            {/* Create your UI visually and easily connect it to your data to supercharge your front-end development. */}
          </Text>
          {platform === 'react' ? (
            <Flex direction={['column', 'column', 'row']}>
              <HomeFeatureCard
                title="Cloud connected"
                as="a"
                className="docs-home-hero-card"
                href="#authentication"
                Icon={RiCloudWindyLine}
              >
                {/* Connect to the cloud in 30 seconds */}
                We handle the hard stuff so you can focus on UI
              </HomeFeatureCard>
              <HomeFeatureCard
                title="Build visually"
                as="a"
                className="docs-home-hero-card"
                href="#figma"
                Icon={RiDragDropLine}
              >
                Compose in your IDE—or visually with Amplify Studio
              </HomeFeatureCard>
              <HomeFeatureCard
                title="Styling your way"
                as="a"
                className="docs-home-hero-card"
                href="#themeable"
                Icon={RiPencilRuler2Line}
              >
                Use plain CSS, design tokens, or with your favorite CSS-in-JS
                library
              </HomeFeatureCard>
            </Flex>
          ) : null}
          <View className="install-code__container">
            <code className="install-code__content">
              {frameworkInstallScript}
            </code>
            <CopyButton
              className="install-code__button"
              variation="link"
              size="large"
              copyText={frameworkInstallScript}
            />
          </View>
          <Button
            size="large"
            variation="primary"
            className="docs-home-getting-started"
            as="a"
            href={`/${platform}/getting-started/installation`}
          >
            Get started building
            <Icon
              ariaLabel=""
              as={MdChevronRight}
              fontSize="xl"
              marginInlineStart="small"
            />
          </Button>
          {/* <Flex
            gap="medium"
            direction={{ base: 'column-reverse', medium: 'row' }}
          >
            <Button
              size="large"
              variation="primary"
              as="a"
              href={`/${platform}/getting-started/installation`}
            >
              Get started
            </Button>
            <View className="install-code__container">
              <code className="install-code__content">
                {frameworkInstallScript}
              </code>
              <CopyButton
                className="install-code__button"
                variation="link"
                size="large"
                copyText={frameworkInstallScript}
              />
            </View>
          </Flex> */}

          {/* <Flex direction="row" justifyContent="center">
            {FRAMEWORKS.map((framework) => (
              <NextLink key={framework} href={`/${framework}`} scroll={false}>
                <a>
                  <FrameworkLogo
                    framework={framework}
                    width="xxl"
                    height="xxl"
                  />
                </a>
              </NextLink>
            ))}
          </Flex> */}
        </Flex>
      </Flex>
    </View>
  );
};
