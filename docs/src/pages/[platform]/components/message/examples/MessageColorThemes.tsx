import { Message, Flex } from '@aws-amplify/ui-react';

export const MessageColorThemes = () => {
  return (
    <Flex direction="column">
      <Message colorTheme="error" content="An error message" />
      <Message colorTheme="info" content="An info message" />
      <Message colorTheme="success" content="A success message" />
      <Message colorTheme="warning" content="A warning message" />
      <Message colorTheme="neutral" content="A neutral message" />
    </Flex>
  );
};
