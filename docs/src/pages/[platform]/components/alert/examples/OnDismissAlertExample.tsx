import { Alert } from '@aws-amplify/ui-react';

export const OnDismissAlertExample = () => {
  return (
    <Alert
      onDismiss={() => alert('Alert dismissed, user metric recorded')}
      isDismissible={true}
    >
      Run a function on dismiss (click the X)
    </Alert>
  );
};
