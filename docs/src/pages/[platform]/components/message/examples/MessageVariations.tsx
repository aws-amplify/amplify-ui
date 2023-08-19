import { Message, Flex } from '@aws-amplify/ui-react';

export const MessageVariations = () => {
  return (
    <Flex direction="column">
      <Message colorTheme="info">Filled (default) message</Message>
      <Message variation="outlined" colorTheme="info">
        Outlined messsage
      </Message>
      <Message variation="plain" colorTheme="info">
        Plain message
      </Message>
    </Flex>
  );
};
