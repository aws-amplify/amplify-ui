import { Alert } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { AlertPropControls } from './AlertPropControls';
import { useAlertProps } from './useAlertProps';

const propsToCode = (props) => `import { Alert } from '@aws-amplify/ui-react';

<Alert
  variation="${props.variation}"
  isDismissible={${props.isDismissible}}
  hasIcon={${props.hasIcon}}
  iconSize={${props.iconSize}}
  heading="${props.heading}"
  headingLevel={${props.headingLevel}}
  >
  ${props.body}
</Alert>`;

export const AlertDemo = () => {
  const alertProps = useAlertProps({
    isDismissible: false,
    hasIcon: true,
    iconSize: 'large',
    heading: 'Alert heading',
    headingLevel: 6,
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
        iconSize={alertProps.iconSize}
        heading={alertProps.heading}
        headingLevel={alertProps.headingLevel}
      >
        {alertProps.body}
      </Alert>
    </Demo>
  );
};
