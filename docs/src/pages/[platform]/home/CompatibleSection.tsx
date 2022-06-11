import NextLink from 'next/link';
import {
  Button,
  Flex,
  Heading,
  Icon as AmpIcon,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { SiTypescript } from 'react-icons/si';
import { FiLifeBuoy, FiZapOff } from 'react-icons/fi';

import { HomeCTA } from 'src/pages/[platform]/home/HomeCTA';

const CompatibleCard = ({ title, description, Icon }) => {
  const { tokens } = useTheme();

  return (
    <Flex direction="column" flex="1" padding={tokens.space.large}>
      <Icon
        as={AmpIcon}
        fontSize={tokens.fontSizes.xl}
        color={tokens.colors.brand.secondary[40]}
      />
      <Text
        fontWeight={tokens.fontWeights.semibold}
        fontSize={tokens.fontSizes.large}
      >
        {title}
      </Text>
      <Text>{description}</Text>
    </Flex>
  );
};

export const CompatibleSection = ({ platform }) => {
  const { tokens } = useTheme();

  return (
    <View as="section" className="docs-home-section">
      <Heading level={2} textAlign="center">
        <strong>Compatible</strong> with your front-end
      </Heading>
      <Flex
        className="container"
        direction={{
          base: 'column',
          large: 'row',
        }}
      >
        <CompatibleCard
          Icon={FiLifeBuoy}
          title="Escape hatches"
          description="Connected components like the Authenticator have headless, or UI-less, implementations that handle complex state management and leave the UI up to you."
        />
        <CompatibleCard
          Icon={FiZapOff}
          title="Styling optional"
          description="Don't like our style? Throw it out and use your own! Amplify UI components use plain CSS so you have complete control over the styling."
        />
        <CompatibleCard
          Icon={SiTypescript}
          title="Typescript support"
          description=""
        />
      </Flex>
      <HomeCTA href={`/${platform}/getting-started/introduction`}>
        Learn more about Amplify UI's design philosophy
      </HomeCTA>
    </View>
  );
};
