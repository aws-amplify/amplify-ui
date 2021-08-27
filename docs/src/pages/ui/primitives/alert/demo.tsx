import React from 'react';
import { Alert, Flex } from '@aws-amplify/ui-react';

import { AlertPropControls } from '@/components/AlertPropControls';
import { useAlertProps } from '@/components/useAlertProps';
import { Example } from '@/components/Example';

export const AlertDemo = () => {
  const alertProps = useAlertProps({
    variation: 'info',
    isDismissible: false,
    hasIcon: true,
    iconSize: 'large',
    title: 'Alert title',
  });

  return (
    <Flex direction="column" gap="0.5rem">
      <AlertPropControls {...alertProps} />
      <Example>
        <Alert
          variation={alertProps.variation}
          isDismissible={alertProps.isDismissible}
          hasIcon={alertProps.hasIcon}
          iconSize={alertProps.iconSize}
          title={alertProps.title}
        >
          This is the Alert message.
        </Alert>
      </Example>
    </Flex>
  );
};
