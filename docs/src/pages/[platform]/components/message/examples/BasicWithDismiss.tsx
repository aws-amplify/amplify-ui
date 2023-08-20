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
    </Flex>
  );
};
