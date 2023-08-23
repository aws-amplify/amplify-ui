import { Message, Flex } from '@aws-amplify/ui-react';

export const HideIcon = () => {
  return (
    <Message hasIcon={false} colorTheme="warning">
      A warning message with no icon.
    </Message>
  );
};
