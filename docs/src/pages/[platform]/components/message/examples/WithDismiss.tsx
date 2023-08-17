import { Message, Flex } from '@aws-amplify/ui-react';

export const WithDismiss = () => {
  return (
    <Flex direction="column">
      <Message
        content="A basic dismissible message"
        isDismissible={true}
        onDismiss={() => {
          alert('Dismissed message');
        }}
      />
      <Message>
        A composable message with dismiss functionality.
        <Message.Dismiss
          onDismiss={() => {
            alert('Dismissed custom message');
          }}
        />
      </Message>
    </Flex>
  );
};
