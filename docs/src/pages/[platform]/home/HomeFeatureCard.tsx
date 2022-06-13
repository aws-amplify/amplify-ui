import { Flex, Icon as AmpIcon, Text, View } from '@aws-amplify/ui-react';

export const HomeFeatureCard = ({ title, description, Icon }) => {
  return (
    <Flex direction="column" flex="1" alignItems="flex-start">
      {Icon ? (
        <View as="span" padding="1rem" backgroundColor="brand.secondary.10">
          <AmpIcon
            ariaLabel=""
            as={Icon}
            fontSize="xl"
            color="brand.secondary.60"
          />
        </View>
      ) : null}
      <Text fontWeight="semibold" fontSize="large">
        {title}
      </Text>
      <Text>{description}</Text>
    </Flex>
  );
};
