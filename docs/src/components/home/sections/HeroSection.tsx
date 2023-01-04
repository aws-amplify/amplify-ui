import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  Flex,
  Grid,
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

import { CardLink } from '@/components/CardLink';
import { FRAMEWORKS, FRAMEWORK_INSTALL_SCRIPTS } from '@/data/frameworks';
import { FrameworkLogo } from '@/components/Logo';
import { TerminalCommand } from '@/components/InstallScripts';
import classNames from 'classnames';

export const HeroSection = () => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  const showEditor = useBreakpointValue({
    base: false,
    large: true,
  });

  const frameworkInstallScript = FRAMEWORK_INSTALL_SCRIPTS[platform.toString()];

  return (
    <View as="section" className="docs-hero">
      <Flex justifyContent="center" textAlign="center">
        <Flex
          direction="column"
          className="docs-home-subsection--thin"
          alignItems="center"
        >
          <Heading
            level={1}
            marginBlockEnd="0"
            className={classNames('expand-out', 'shown')}
          >
            Themeable, accessible components
            <br />
            <strong>Ready to connect to the cloud</strong>
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
            <Grid gap="medium" templateColumns={['1fr', '1fr', '1fr 1fr 1fr']}>
              <CardLink
                variation="home"
                title="Cloud connected"
                href="#authentication"
                icon={<RiCloudWindyLine />}
                desc="Focus on your UI and let us take care of the rest"
              />
              <CardLink
                variation="home"
                title="Build visually"
                href="#figma"
                icon={<RiDragDropLine />}
                desc="Compose in your IDE—or visually with Amplify Studio"
              />
              <CardLink
                variation="home"
                title="Styling your way"
                href="#themeable"
                icon={<RiPencilRuler2Line />}
                desc="Use plain CSS, design tokens, or with your favorite CSS-in-JS library"
              />
            </Grid>
          ) : null}

          <TerminalCommand command={frameworkInstallScript} variant="hero" />

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
