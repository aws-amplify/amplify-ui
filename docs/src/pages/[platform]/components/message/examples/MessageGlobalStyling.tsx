import { Message } from '@aws-amplify/ui-react';

export const MessageGlobalStyling = () => {
  return (
    <Message className="message-global-styles" alignItems="center">
      <Message.Heading>Message heading</Message.Heading>
      Message with global styling
    </Message>
  );
};
