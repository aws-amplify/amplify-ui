import { Flex, Message } from '@aws-amplify/ui-react';

export const Outline = () => {
  return (
    <Flex direction="column" padding="medium">
      <Message heading="A heading for a message" variation="outline">
        This is a plain default message.
      </Message>
      <Message
        heading="A heading for a message"
        colorTheme="info"
        variation="outline"
      >
        This is a plain default message.
      </Message>
      <Message
        heading="A heading for a message"
        colorTheme="success"
        variation="outline"
      >
        This is a plain default message.
      </Message>
      <Message
        heading="A heading for a message"
        colorTheme="error"
        variation="outline"
      >
        This is a plain default message.
      </Message>
      <Message
        heading="A heading for a message"
        colorTheme="warning"
        variation="outline"
      >
        This is a plain default message.
      </Message>
    </Flex>
  );
};
