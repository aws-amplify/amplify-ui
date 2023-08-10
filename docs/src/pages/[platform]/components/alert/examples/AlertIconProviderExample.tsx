import { Alert, Flex, IconsProvider } from '@aws-amplify/ui-react';
import {
  FcMediumPriority,
  FcHighPriority,
  FcInfo,
  FcOk,
  FcMinus,
} from 'react-icons/fc';

export const AlertIconProviderExample = () => (
  <IconsProvider
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
      <Alert variation="info" heading="Info">
        Here is some info
      </Alert>
      <Alert variation="success" heading="Success" isDismissible>
        Hooray!
      </Alert>
      <Alert variation="warning" heading="Warning" />
      <Alert variation="error" heading="Error" />
    </Flex>
  </IconsProvider>
);
