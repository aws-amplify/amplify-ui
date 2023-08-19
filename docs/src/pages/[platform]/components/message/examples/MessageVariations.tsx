import { Message, Flex } from '@aws-amplify/ui-react';

export const MessageVariations = () => {
  return (
    <Flex direction="column">
      <Message>Filled (default) message with a background</Message>
      <Message variation="outlined">Outlined messsage with a border</Message>
      <Message variation="plain">
        Plain message with no background or border
      </Message>
    </Flex>
  );
};
