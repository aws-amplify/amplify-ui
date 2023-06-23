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
        maxWidth="520px"
      >
        <MessageContent direction="row" alignItems="center">
          <MessageTitle>Registration details saved.</MessageTitle>
          <Button colorTheme="overlay" marginLeft="auto" size="small">
            View details
          </Button>
        </MessageContent>
      </Message>
      <Card
        padding="xl"
        backgroundImage="linear-gradient(to right, #fffcdc, #d9a7c7)"
        maxWidth="480px"
      >
        <Flex direction="column">
          <Text>
            Join us in Las Vegas to hear the latest from AWS, learn from
            experts, and connect with the global cloud community.
          </Text>
          <Flex>
            <Button variation="primary" colorTheme="brand">
              Register
            </Button>
            <Button colorTheme="overlay">Schedule</Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
