import React from 'react';
import { Alert, Flex } from '@aws-amplify/ui-react';

import { AlertPropControls } from '@/components/AlertPropControls';
import { useAlertProps } from '@/components/useAlertProps';
import { Example } from '@/components/Example';

export const AlertDemo = () => {
  const alertProps = useAlertProps({ variation: 'info' }); // set the defaults

  return (
    <Flex direction="column" gap="0.5rem">
      <AlertPropControls {...alertProps} />
      <Example>
        <Alert
          variation={alertProps.variation}
          isDismissible={alertProps.isDismissible}
          hasIcon={alertProps.hasIcon}
          title={alertProps.title}
        >
          This is the Alert message.
        </Alert>
      </Example>
    </Flex>
  );
};
