import { Message } from '@aws-amplify/ui-react';

export const MessageStyleProps = () => {
  return (
    <Message
      alignItems="center"
      colorTheme="info"
      color="neutral.90"
      backgroundColor="#d6ffff"
    >
      <Message.Icon fontSize="xxxl" />
      <Message.Content direction="row" alignItems="center" gap="large">
        <Message.Heading fontSize="xl" color="neutral.100">
          Message heading
        </Message.Heading>
        Message with global styling
      </Message.Content>
      <Message.Dismiss
        alignSelf="center"
        borderColor="#447a7a"
        borderStyle="dashed"
      />
    </Message>
  );
};
