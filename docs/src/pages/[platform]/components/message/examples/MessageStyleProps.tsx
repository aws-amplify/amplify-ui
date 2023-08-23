import { Message } from '@aws-amplify/ui-react';

export const MessageStyleProps = () => {
  return (
    <Message
      alignItems="center"
      colorTheme="info"
      color="neutral.100"
      backgroundColor="teal.10"
    >
      <Message.Icon fontSize="xxxl" />
      <Message.Content direction="row" alignItems="center" gap="large">
        <Message.Heading fontSize="xl">Message heading</Message.Heading>
        Message with global styling
      </Message.Content>
      <Message.Dismiss
        alignSelf="center"
        borderColor="#447a7a"
        borderStyle="dashed"
        borderWidth="2px"
      />
    </Message>
  );
};
