import {
  Card,
  Image,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button,
  useTheme,
} from '@aws-amplify/ui-react';

export const DefaultCardExample = () => {
  const { tokens } = useTheme();
  return (
    <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
    >
      <Card>
        <Flex direction="row" alignItems="flex-start">
          <Image
            alt="Road to milford sound"
            src="/road-to-milford-new-zealand-800w.jpg"
            width="33%"
          />
          <Flex
            direction="column"
            alignItems="flex-start"
            gap={tokens.space.xs}
          >
            <Flex>
              <Badge size="small" variation="info">
                Plus
              </Badge>
              <Badge size="small" variation="success">
                Verified
              </Badge>
            </Flex>

            <Heading level={5}>
              New Zealand White Water Outdoor Adventure
            </Heading>

            <Text as="span">
              Join us on this beautiful outdoor adventure through the glittering
              rivers through the snowy peaks on New Zealand.
            </Text>
            <Button variation="primary">Book it</Button>
          </Flex>
        </Flex>
      </Card>
    </View>
  );
};
