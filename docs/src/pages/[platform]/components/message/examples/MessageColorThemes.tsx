import { Message, Flex } from '@aws-amplify/ui-react';

export const MessageColorThemes = () => {
  return (
    <Flex direction="column">
      <Message colorTheme="error" content="Message content." />
      <Message colorTheme="info" content="Message content." />
      <Message colorTheme="success" content="Message content." />
      <Message colorTheme="warning" content="Message content." />
      <Message colorTheme="neutral" content="Message content." />
    </Flex>
  );
};
