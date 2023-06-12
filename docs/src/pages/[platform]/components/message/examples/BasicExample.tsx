import {
  View,
  Flex,
  Message,
  MessageTitle,
  MessageContent,
  Text,
} from '@aws-amplify/ui-react';

export const BasicExample = () => {
  return (
    <View padding="medium" backgroundColor="neutral.10">
      <Flex direction="column" maxWidth="420px">
        <Message isDismissible={true}>
          <MessageContent>
            <MessageTitle>This is a title</MessageTitle>
            This is a plain default message.
          </MessageContent>
        </Message>
        <Message colorTheme="info" isDismissible={true}>
          <MessageContent>
            <MessageTitle>This is a title</MessageTitle>
            This is a plain info message.
          </MessageContent>
        </Message>
        <Message colorTheme="success" isDismissible={true}>
          <MessageContent>
            <MessageTitle>This is a title</MessageTitle>
            This is a plain success message.
          </MessageContent>
        </Message>
        <Message colorTheme="error" isDismissible={true}>
          <MessageContent>
            <MessageTitle>This is a title</MessageTitle>
            This is a plain error message.
          </MessageContent>
        </Message>
        <Message colorTheme="warning" isDismissible={true}>
          <MessageContent>
            <MessageTitle>This is a title</MessageTitle>
            This is a plain warning message.
          </MessageContent>
        </Message>
      </Flex>
    </View>
  );
};
