import {
  Grid,
  Heading,
  Link,
  Text,
  View,
  Flex,
  Icon as AmpIcon,
  Button,
} from '@aws-amplify/ui-react';
import {
  AmplifyIcon,
  ServerIcon,
  LibraryIcon,
  CLIIcon,
} from '@/components/Icons';
import { useIntersectionObserver } from '@/components/useIntersection';
import { useRef } from 'react';
import { HomeFeatureCard } from './HomeFeatureCard';

const AmpCard = ({ title, description, href, Icon }) => (
  <Flex
    as={Link}
    alignItems="center"
    isExternal
    href={href}
    className="docs-home-amp-product-card"
  >
    <Icon
      aria-label=""
      as={AmpIcon}
      className="docs-home-amp-product-card-icon"
    />
    <View flex="1">
      <Text className="docs-home-amp-product-card-title">{title}</Text>
      <Text className="docs-home-amp-product-card-description">
        {description}
      </Text>
    </View>
  </Flex>
);

export const AmplifySection = ({ platform }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <View
      ref={ref}
      as="section"
      className={`docs-home-section fade-in ${isVisible ? 'shown' : ''}`}
    >
      <Flex direction="column" className="docs-home-subsection--thin">
        <Heading level={2}>
          Better <strong>together</strong> with AWS Amplify
        </Heading>
        {/* <Flex direction="column"> */}
        <HomeFeatureCard
          title="Build your application visually in Amplify Studio"
          Icon={AmplifyIcon}
        >
          Deploy and manage your app backend with a GraphQL API, User login,
          File storage and more in minutes. Start small and build to the full
          scale of AWS!
          {platform === 'react'
            ? 'Build components visually in Figma, bind them to your data, and use them in your codebase.'
            : ''}
          <br />
          <Link href="https://docs.amplify.aws/console/">
            Learn more about Amplify Studio
          </Link>
        </HomeFeatureCard>
        <HomeFeatureCard
          title="Connect your UI to your backend easily with Amplify libraries."
          Icon={LibraryIcon}
        >
          Amplify Libraries offer an opinionated and declarative interfaces to
          easily connect to your backend. The libraries are pluggable and can be
          extended to use other providers.
          <br />
          <Link href={`https://docs.amplify.aws/lib/q/platform/${platform}/`}>
            Learn more about Amplify Libraries
          </Link>
        </HomeFeatureCard>
        <HomeFeatureCard
          title="Deploy your front-end in minutes with Amplify Hosting."
          Icon={ServerIcon}
        >
          Fully managed web hosting with full-stack CI/CD. Amplify Hosting has
          support for common SPA and SSG frameworks like Next.js, Gatsby, and
          Eleventy.
          <br />
          <Link
            isExternal
            href="https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html"
          >
            Learn more about Amplify Hosting
          </Link>
        </HomeFeatureCard>
        {/* </Flex> */}
        {/* <Grid
          className="docs-home-subsection--thin"
          templateColumns={{ base: '1fr', medium: '1fr 1fr' }}
        >
          <AmpCard
            href={`https://docs.amplify.aws/lib/q/platform/${platform}/`}
            title="Amplify Libraries"
            Icon={LibraryIcon}
            description="Connect app to new or existing AWS services (Cognito, S3, and more)."
          />
          <AmpCard
            href="https://docs.amplify.aws/cli/"
            title="Amplify CLI"
            Icon={CLIIcon}
            description="Configure an app backend with a guided CLI workflow."
          />
          <AmpCard
            href="https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html"
            title="Amplify Hosting"
            Icon={ServerIcon}
            description="Fully managed web hosting with full-stack CI/CD."
          />
          <AmpCard
            href="https://docs.amplify.aws/console/"
            title="Amplify Studio"
            Icon={AmplifyIcon}
            description="Visual development environment to accelerate full-stack development."
          />
        </Grid> */}
      </Flex>
    </View>
  );
};
