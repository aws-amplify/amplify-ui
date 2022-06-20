import NextLink from 'next/link';
import {
  Button,
  Flex,
  Heading,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import {
  MdOutlineAutoAwesome,
  MdAccessibilityNew,
  MdOutlineSupport,
  MdCode,
} from 'react-icons/md';
import { CopyButton } from '@/components/CopyButton';
import { FrameworkChooser } from '@/components/Layout/FrameworkChooser';
import { useCustomRouter } from '@/components/useCustomRouter';
import { HomeFeatureCard } from '../HomeFeatureCard';
import { FRAMEWORKS } from '@/data/frameworks';
import { FrameworkLogo } from '@/components/Logo';

export const HeroSection = () => {
  const { tokens } = useTheme();
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
          justifyContent="stretch"
        >
          <Heading level={1} className="docs-home-h1">
            Build UI <strong>faster</strong>
          </Heading>
          <Text
            fontSize={{
              base: tokens.fontSizes.large,
              small: tokens.fontSizes.xl,
            }}
          >
            Amplify UI simplifies building accessible, performant, and beautiful
            applications= with cloud-connected capabilities, building blocks,
            theming, and utilities.
          </Text>
          <Flex direction={['column', 'column', 'row']}>
            <HomeFeatureCard
              title="Accessible"
              as="a"
              className="docs-home-hero-card"
              href="#accessibility"
              Icon={MdAccessibilityNew}
            >
              Ensure all users can use your application.
            </HomeFeatureCard>
            <HomeFeatureCard
              title="Themeable"
              href="#themeable"
              as="a"
              className="docs-home-hero-card"
              Icon={MdOutlineAutoAwesome}
            >
              Create your own unique look.
            </HomeFeatureCard>
            <HomeFeatureCard
              title="Compatible"
              href="#compatible"
              as="a"
              className="docs-home-hero-card"
              Icon={MdCode}
            >
              Works well in any tech stack.
            </HomeFeatureCard>
          </Flex>

          <Flex
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
          </Flex>

          <Flex direction="row" justifyContent="center">
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
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
};
