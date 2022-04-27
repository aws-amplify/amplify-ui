import { Alert } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { AlertPropControls } from './AlertPropControls';
import { useAlertProps } from './useAlertProps';
import { propsToCode } from './propsToCode';

export const AlertDemo = () => {
  const alertProps = useAlertProps({
    isDismissible: false,
    hasIcon: true,
    heading: 'Alert heading',
    body: 'This is the alert message',
  });

  return (
    <Demo
      code={propsToCode(alertProps)}
      propControls={<AlertPropControls {...alertProps} />}
    >
      <Alert
        variation={alertProps.variation}
        isDismissible={alertProps.isDismissible}
        hasIcon={alertProps.hasIcon}
        heading={alertProps.heading}
      >
        {alertProps.body}
      </Alert>
    </Demo>
  );
};
