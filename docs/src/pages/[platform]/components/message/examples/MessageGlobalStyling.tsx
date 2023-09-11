import { Message } from '@aws-amplify/ui-react';

export const MessageGlobalStyling = () => {
  return (
    <Message
      heading="Message heading"
      className="message-global-styles"
      alignItems="center"
    >
      Message with global styling
    </Message>
  );
};
