import {
  Flex,
  Message,
  MessageTitle,
  MessageContent,
} from '@aws-amplify/ui-react';

export const Outline = () => {
  return (
    <Flex direction="column" padding="medium">
      <Message variation="outline">
        <MessageContent>
          <MessageTitle>A title for a message</MessageTitle>
          This is an outlined neutral message.
        </MessageContent>
      </Message>
      <Message colorTheme="info" variation="outline">
        <MessageContent>
          <MessageTitle>A title for a message</MessageTitle>
          This is a outlined info message.
        </MessageContent>
      </Message>
      <Message colorTheme="success" variation="outline">
        <MessageContent>
          <MessageTitle>A title for a message</MessageTitle>
          This is an outlined success message.
        </MessageContent>
      </Message>
      <Message colorTheme="error" variation="outline">
        <MessageContent>
          <MessageTitle>A title for a message</MessageTitle>
          This is an outlined error message.
        </MessageContent>
      </Message>
      <Message colorTheme="warning" variation="outline">
        <MessageContent>
          <MessageTitle>A title for a message</MessageTitle>
          This is an outlined warning message.
        </MessageContent>
      </Message>
    </Flex>
  );
};
