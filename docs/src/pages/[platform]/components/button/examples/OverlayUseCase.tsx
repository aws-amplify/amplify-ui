import {
  Button,
  Flex,
  Card,
  Heading,
  Text,
  Message,
  MessageTitle,
  MessageContent,
  View,
} from '@aws-amplify/ui-react';

export const OverlayUseCase = () => {
  return (
    <Flex direction="column">
      <Message
        variation="filled"
        colorTheme="success"
        isDismissible={true}
        maxWidth="360px"
      >
        <MessageContent>
          <MessageTitle>Registration details saved.</MessageTitle>
        </MessageContent>
      </Message>
      <Card
        padding="large"
        backgroundColor="brand.secondary.80"
        maxWidth="480px"
      >
        <Flex direction="column">
          <Text color="font.inverse">
            Join us in Las Vegas to hear the latest from AWS, learn from
            experts, and connect with the global cloud community.
          </Text>
          <Button variation="primary" colorTheme="overlay">
            Register
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};
