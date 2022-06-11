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

import { HomeCTA } from '@/components/Home/HomeCTA';

const CompatibleCard = ({ title, description, Icon }) => {
  const { tokens } = useTheme();

  return (
    <Flex direction="column" flex="1" padding={tokens.space.large}>
      <Icon as={AmpIcon} />
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
          Icon={SiTypescript}
          title="Escape hatches"
          description="Connected components like the Authenticator have headless, or UI-less, implementations that handle complex state management and leave the UI up to you."
        />
        <CompatibleCard
          Icon={SiTypescript}
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
