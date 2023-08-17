import { Message, Flex } from '@aws-amplify/ui-react';

export const MessageVariations = () => {
  return (
    <Flex wrap="wrap">
      <Message>filled (default) message</Message>
      <Message variation="outlined">outlined messsage</Message>
      <Message variation="plain">plain message</Message>
    </Flex>
  );
};
