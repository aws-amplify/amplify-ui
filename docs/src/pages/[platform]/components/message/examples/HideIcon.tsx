import { Message, Flex } from '@aws-amplify/ui-react';

export const HideIcon = () => {
  return (
    <Message
      showIcon={false}
      colorTheme="warning"
      content="A warning message with no icon."
    />
  );
};
