import { Message, Flex, IconsProvider } from '@aws-amplify/ui-react';
import {
  FcMediumPriority,
  FcHighPriority,
  FcInfo,
  FcOk,
  FcMinus,
} from 'react-icons/fc';

export const IconProviderExample = () => (
  <IconsProvider
    icons={{
      message: {
        info: <FcInfo />,
        success: <FcOk />,
        error: <FcHighPriority />,
        warning: <FcMediumPriority />,
        close: <FcMinus />,
      },
    }}
  >
    <Flex direction="column">
      <Message colorTheme="info" isDismissible>
        Info message with custom icon
      </Message>
      <Message colorTheme="success">Success message with custom icon</Message>
      <Message colorTheme="error">Error message with custom icon</Message>
      <Message colorTheme="warning">Warning message with custom icon</Message>
    </Flex>
  </IconsProvider>
);
