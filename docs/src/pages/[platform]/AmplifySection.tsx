import {
  Card,
  Grid,
  Heading,
  Link,
  Text,
  useTheme,
  View,
  Flex,
  Icon as AmpIcon,
} from '@aws-amplify/ui-react';
import { TbPrompt } from 'react-icons/tb';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { BsTerminalFill } from 'react-icons/bs';
import { DiTerminal, DiJsBadge } from 'react-icons/di';
import { FaServer, FaAws } from 'react-icons/fa';

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
  const { tokens } = useTheme();

  return (
    <View as="section" className="docs-home-section">
      <View className="docs-home-container">
        <Heading level={2} textAlign="center" margin={tokens.space.large}>
          Integrated with AWS Amplify
        </Heading>
        <Grid
          className="container"
          templateColumns={{ base: '1fr', medium: '1fr 1fr' }}
          gap={tokens.space.xl}
          flex="1"
        >
          <AmpCard
            href="https://docs.amplify.aws/lib/q/platform/js/"
            title="Amplify Libraries"
            Icon={DiJsBadge}
            description="Connect app to new or existing AWS services (Cognito, S3, and more)."
          />
          <AmpCard
            href="https://docs.amplify.aws/cli/"
            title="Amplify CLI"
            Icon={DiTerminal}
            description="Configure an app backend with a guided CLI workflow."
          />
          <AmpCard
            href="https://docs.amplify.aws/console/"
            title="Amplify Hosting"
            Icon={FaServer}
            description="Fully managed web hosting with full-stack CI/CD."
          />
          <AmpCard
            href="https://docs.amplify.aws/console/"
            title="Amplify Studio"
            Icon={FaAws}
            description="Visual development environment to accelerate full-stack development."
          />
        </Grid>
      </View>
    </View>
  );
};
