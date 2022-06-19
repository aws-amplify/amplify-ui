import { Flex, Icon as AmpIcon, Text, View } from '@aws-amplify/ui-react';

export const HomeFeatureCard = ({ title, Icon, children, ...rest }) => {
  return (
    <Flex
      {...rest}
      direction="column"
      flex="1"
      alignItems={['center', 'center', 'flex-start']}
      textAlign={['center', 'center', 'initial']}
    >
      {Icon ? (
        <View
          as="span"
          padding="1rem"
          backgroundColor="brand.secondary.10"
          borderRadius="small"
        >
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
      <Text>{children}</Text>
    </Flex>
  );
};
