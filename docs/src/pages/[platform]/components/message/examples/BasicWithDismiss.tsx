import { Message } from '@aws-amplify/ui-react';

export const BasicWithDismiss = () => {
  return (
    <Message
      isDismissible={true}
      dismissLabel="Dismiss this custom message"
      onDismiss={() => {
        alert('Dismissed message');
      }}
    >
      A basic dismissible message
    </Message>
  );
};
