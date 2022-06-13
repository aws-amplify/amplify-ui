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
  return (
    <View as="section" className="docs-home-section">
      <View className="docs-home-container">
        <Heading level={2} textAlign="center">
          <strong>Integrated</strong> with AWS Amplify
        </Heading>
        <Grid
          className="container"
          templateColumns={{ base: '1fr', medium: '1fr 1fr' }}
          gap="xl"
          flex="1"
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
      </View>
    </View>
  );
};
