import { View, Flex, Message, MessageTitle, Text } from '@aws-amplify/ui-react';

export const BasicExample = () => {
  return (
    <View padding="medium" backgroundColor="neutral.10">
      <Flex direction="column" maxWidth="420px">
        <Message isDismissible={true}>
          <MessageTitle>This is a title</MessageTitle>
          This is a plain default message.
        </Message>
        <Message colorTheme="info" isDismissible={true}>
          <MessageHeading>This is a title</MessageHeading>
          This is a plain info message.
        </Message>
        <Message colorTheme="success" isDismissible={true}>
          <MessageHeading>This is a title</MessageHeading>
          This is a plain success message.
        </Message>
        <Message colorTheme="error" isDismissible={true}>
          <MessageHeading>This is a title</MessageHeading>
          This is a plain error message.
        </Message>
        <Message colorTheme="warning" isDismissible={true}>
          <MessageHeading>This is a title</MessageHeading>
          This is a plain warning message.
        </Message>
      </Flex>
    </View>
  );
};
