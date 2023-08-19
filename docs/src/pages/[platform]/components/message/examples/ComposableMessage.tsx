import { Flex, Message, Text, Button } from '@aws-amplify/ui-react';

export const ComposableMessage = () => {
  return (
    <Flex direction="column">
      <Message colorTheme="info" variation="outlined">
        <Message.Heading>Build #347</Message.Heading>
        <Text>New content is available to download.</Text>
        <Button colorTheme="info" size="small" marginInlineStart="auto">
          Download
        </Button>
        <Message.Dismiss size="small" marginInlineStart="0">
          Dismiss
        </Message.Dismiss>
      </Message>
      <Message colorTheme="warning">
        <Message.Icon />
        <Message.Content>
          <Message.Heading>Build #348</Message.Heading>
          There was an issue with build #348
        </Message.Content>
        <Button variation="primary" size="small" colorTheme="warning">
          Redeploy
        </Button>
      </Message>
    </Flex>
  );
};
