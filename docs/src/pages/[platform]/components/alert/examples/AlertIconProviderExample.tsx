import { Alert, Flex, IconProvider } from '@aws-amplify/ui-react';
import {
  FcMediumPriority,
  FcHighPriority,
  FcInfo,
  FcOk,
  FcMinus,
} from 'react-icons/fc';

export const AlertIconProviderExample = () => (
  <IconProvider
    icons={{
      alert: {
        info: <FcInfo />,
        success: <FcOk />,
        error: <FcHighPriority />,
        warning: <FcMediumPriority />,
        close: <FcMinus />,
      },
    }}
  >
    <Flex direction="column">
      <Alert heading="Default alert title">Hello</Alert>
      <Alert variation="info" heading="Info">
        Here is some info
      </Alert>
      <Alert variation="success" heading="Success" isDismissible>
        Hooray!
      </Alert>
      <Alert variation="warning" heading="Warning" />
      <Alert variation="error" heading="Error" />
    </Flex>
  </IconProvider>
);
