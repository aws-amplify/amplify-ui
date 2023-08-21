import { Message, Flex } from '@aws-amplify/ui-react';

export const WithCustomizedDismiss = () => {
  return (
    <Flex direction="column">
      <Message colorTheme="info">
        Message with customized dismiss button
        <Message.Dismiss
          variation="primary"
          colorTheme="info"
          hasIcon={false}
          size="small"
          onDismiss={() => alert('custom onDismiss event')}
          aria-label="Dismiss Customize dismiss button message"
        >
          Dismiss
        </Message.Dismiss>
      </Message>
      <Message>
        Message with dismiss event override.
        <Message.Dismiss onClick={() => alert('override dissmiss event')} />
      </Message>
    </Flex>
  );
};
