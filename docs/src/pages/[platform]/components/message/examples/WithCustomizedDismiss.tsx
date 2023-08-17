import { Message, Flex } from '@aws-amplify/ui-react';

export const WithCustomizedDismiss = () => {
  return (
    <Flex direction="column">
      <Message>
        <Message.Content>
          <Message.Heading>Customize dismiss button</Message.Heading>A message
          with customized dismiss button.
        </Message.Content>

        <Message.Dismiss
          variation="primary"
          colorTheme="info"
          showIcon={false}
          size="small"
          aria-label="Dismiss Customize dismiss button message"
        >
          Dismiss
        </Message.Dismiss>
      </Message>
    </Flex>
  );
};
