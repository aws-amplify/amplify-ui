import { Message, Flex } from '@aws-amplify/ui-react';

export const BasicWithDismiss = () => {
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
        Content
        <Message.Dismiss
          onDismiss={() => alert(' dismiss composable message')}
        />
      </Message>
    </Flex>
  );
};
