import {
  Grid,
  Heading,
  Link,
  Text,
  View,
  Flex,
  Icon as AmpIcon,
} from '@aws-amplify/ui-react';
import {
  AmplifyIcon,
  ServerIcon,
  LibraryIcon,
  CLIIcon,
} from '@/components/Icons';
import { useIntersectionObserver } from '@/components/useIntersection';
import { useRef } from 'react';

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

export const AmplifySection = () => {
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
          <strong>Integrated</strong> with AWS Amplify
        </Heading>
        <Grid
          className="docs-home-subsection--thin"
          templateColumns={{ base: '1fr', medium: '1fr 1fr' }}
          gap="xl"
        >
          <AmpCard
            href="https://docs.amplify.aws/lib/q/platform/js/"
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
            href="https://docs.amplify.aws/console/"
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
        </Grid>
      </Flex>
    </View>
  );
};
