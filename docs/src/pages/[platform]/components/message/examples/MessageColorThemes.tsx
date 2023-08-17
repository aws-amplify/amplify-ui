import { Message, Flex } from '@aws-amplify/ui-react';

export const MessageColorThemes = () => {
  return (
    <Flex direction="row" wrap="wrap">
      <Message colorTheme="error">error message</Message>
      <Message colorTheme="info">info messsage</Message>
      <Message colorTheme="success">success message</Message>
      <Message colorTheme="warning">warning message</Message>
      <Message colorTheme="neutral">neutral (default) message</Message>
    </Flex>
  );
};
