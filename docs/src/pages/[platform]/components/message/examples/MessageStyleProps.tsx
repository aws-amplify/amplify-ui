import { Message } from '@aws-amplify/ui-react';

export const MessageStyleProps = () => {
  return (
    <Message
      alignItems="center"
      colorTheme="info"
      color="neutral.100"
      backgroundColor="teal.10"
      heading="Message heading"
    >
      Message styled via style props
    </Message>
  );
};
