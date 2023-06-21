import { Button, Flex, Card, Heading, Text } from '@aws-amplify/ui-react';

export const BrandUseCase = () => {
  return (
    <Card padding="xxxl" backgroundColor="neutral.100">
      <Card variation="elevated" padding="large" maxWidth="480px">
        <Flex direction="column">
          <Heading level={2} fontSize="xl">
            re:Invent
          </Heading>
          <Text>
            Join us in Las Vegas to hear the latest from AWS, learn from
            experts, and connect with the global cloud community.
          </Text>
          <Flex>
            <Button variation="primary">Register now</Button>
            <Button variation="link" as="a" href="/">
              Schedule
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Card>
  );
};
