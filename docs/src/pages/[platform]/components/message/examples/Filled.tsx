import { Flex, Message } from '@aws-amplify/ui-react';

export const Filled = () => {
  return (
    <Flex direction="column" padding="medium">
      <Message
        heading="A heading for a message"
        variation="filled"
        isDismissible={true}
      >
        This is a filled default message.
      </Message>
      <Message
        heading="A heading for a message"
        colorTheme="info"
        variation="filled"
        isDismissible={true}
      >
        This is a filled default message.
      </Message>
      <Message
        heading="A heading for a message"
        colorTheme="success"
        variation="filled"
        isDismissible={true}
      >
        This is a filled default message.
      </Message>
      <Message
        heading="A heading for a message"
        colorTheme="error"
        variation="filled"
        isDismissible={true}
      >
        This is a filled default message.
      </Message>
      <Message
        heading="A heading for a message"
        colorTheme="warning"
        variation="filled"
        isDismissible={true}
      >
        This is a filled default message.
      </Message>
    </Flex>
  );
};
