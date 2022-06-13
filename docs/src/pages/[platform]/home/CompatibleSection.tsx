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
import { RiLifebuoyLine } from 'react-icons/ri';
import {
  MdOutlineFlashOff,
  MdFlashOff,
  MdOutlineSupport,
} from 'react-icons/md';

import { HomeCTA } from 'src/pages/[platform]/home/HomeCTA';

const CompatibleCard = ({ title, description, Icon }) => {
  return (
    <Flex direction="column" flex="1" alignItems="flex-start">
      <AmpIcon as={Icon} fontSize="xl" color="brand.secondary.20" />
      <Text fontWeight="semibold" fontSize="large">
        {title}
      </Text>
      <Text>{description}</Text>
    </Flex>
  );
};

export const CompatibleSection = ({ platform }) => {
  return (
    <View as="section" className="docs-home-section">
      <Flex direction="column">
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
            Icon={MdOutlineSupport}
            title="Escape hatches"
            description="Connected components like the Authenticator have headless, or UI-less, implementations that handle complex state management and leave the UI up to you."
          />
          <CompatibleCard
            Icon={MdOutlineFlashOff}
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
      </Flex>
    </View>
  );
};
