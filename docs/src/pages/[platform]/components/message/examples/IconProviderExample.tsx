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
      <Message
        colorTheme="info"
        content="Info message with custom icon"
        isDismissible
      />
      <Message
        colorTheme="success"
        content="Success message with custom icon"
      />
      <Message colorTheme="error" content="Error message with custom icon" />
      <Message
        colorTheme="warning"
        content="Warning message with custom icon"
      />
    </Flex>
  </IconsProvider>
);
