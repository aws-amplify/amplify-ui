import NextLink from 'next/link';
import {
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useBreakpointValue,
  View,
} from '@aws-amplify/ui-react';
import { MdChevronRight, MdArrowDownward } from 'react-icons/md';
import {
  RiCloudWindyLine,
  RiDragDropLine,
  RiPencilRuler2Line,
} from 'react-icons/ri';

import { useCustomRouter } from '@/components/useCustomRouter';
import { HomeFeatureCard } from '../HomeFeatureCard';
import { FRAMEWORKS } from '@/data/frameworks';
import { FrameworkLogo } from '@/components/Logo';
import { TerminalCommand } from '@/components/InstallScripts';

export const HeroSection = () => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  const showEditor = useBreakpointValue({
    base: false,
    large: true,
  });

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
          </Text>
          {platform === 'react' ? (
            <Flex direction={['column', 'column', 'row']}>
              <HomeFeatureCard
                title="Cloud connected"
                as="a"
                className="docs-home-hero-card"
                href="#authentication"
                icon={RiCloudWindyLine}
              >
                {/* Connect to the cloud in 30 seconds */}
                We handle the hard stuff so you can focus on UI
              </HomeFeatureCard>
              <HomeFeatureCard
                title="Build visually"
                as="a"
                className="docs-home-hero-card"
                href="#figma"
                icon={RiDragDropLine}
              >
                Compose in your IDE—or visually with Amplify Studio
              </HomeFeatureCard>
              <HomeFeatureCard
                title="Styling your way"
                as="a"
                className="docs-home-hero-card"
                href="#themeable"
                icon={RiPencilRuler2Line}
              >
                Use plain CSS, design tokens, or with your favorite CSS-in-JS
                library
              </HomeFeatureCard>
            </Flex>
          ) : null}

          <TerminalCommand command={frameworkInstallScript} />

          <Flex direction="row">
            <Button
              size="large"
              variation="primary"
              className="docs-home-cta"
              as="a"
              href={`/${platform}/getting-started/installation`}
            >
              Get started building
              <Icon ariaLabel="" as={MdChevronRight} fontSize="xl" />
            </Button>
            {platform === 'react' && showEditor ? (
              <Button
                size="large"
                className="docs-home-cta"
                as="a"
                href="#live"
              >
                Or try it out
                <Icon ariaLabel="" as={MdArrowDownward} fontSize="xl" />
              </Button>
            ) : null}
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
};
