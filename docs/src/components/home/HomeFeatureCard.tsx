import { BaseStyleProps, Flex, Icon, Text, View } from '@aws-amplify/ui-react';

interface HomeFeatureCardProps extends BaseStyleProps {
  title: string;
  icon?: React.FC<any>;
  children?: React.ReactNode;
}

export const HomeFeatureCard = ({
  title,
  icon,
  children,
  ...rest
}: HomeFeatureCardProps) => {
  return (
    <Flex
      {...rest}
      direction={['column', 'row']}
      flex="1"
      alignItems={['center', 'flex-start']}
      textAlign={['center', 'initial']}
    >
      {icon ? (
        <View
          as="span"
          padding="1rem"
          backgroundColor="brand.secondary.10"
          borderRadius="small"
        >
          <Icon
            ariaLabel=""
            as={icon}
            fontSize="xl"
            color="brand.secondary.60"
          />
        </View>
      ) : null}
      <View>
        <Text fontWeight="semibold" fontSize="large">
          {title}
        </Text>
        <Text>{children}</Text>
      </View>
    </Flex>
  );
};
