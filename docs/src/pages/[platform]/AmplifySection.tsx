import {
  Card,
  Grid,
  Heading,
  Link,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';

const AmpCard = ({ title, description, href }) => (
  <Link isExternal href={href} className="docs-home-amp-product-card">
    <Card textAlign="center" variation="outlined">
      <Heading level={3}>{title}</Heading>
      <Text>{description}</Text>
    </Card>
  </Link>
);

export const AmplifySection = () => {
  const { tokens } = useTheme();

  return (
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
  );
};
