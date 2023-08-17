import { Flex, Message } from '@aws-amplify/ui-react';

export const WithTitleContent = () => {
  return (
    <Flex direction="column">
      <Message>
        <Message.Heading>Build #347</Message.Heading>
        New content is available to download.
      </Message>
      <Message>
        <Message.Content>
          <Message.Heading>Build #348</Message.Heading>
          This message has a column layout because it uses Message.Content
        </Message.Content>
      </Message>
    </Flex>
  );
};
