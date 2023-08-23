import { Message, Flex } from '@aws-amplify/ui-react';

export const MessageColorThemes = () => {
  return (
    <Flex direction="column">
      <Message colorTheme="error">An error message</Message>
      <Message colorTheme="info">An info message</Message>
      <Message colorTheme="success">A success message</Message>
      <Message colorTheme="warning">A warning message</Message>
      <Message colorTheme="neutral">A neutral message</Message>
    </Flex>
  );
};
