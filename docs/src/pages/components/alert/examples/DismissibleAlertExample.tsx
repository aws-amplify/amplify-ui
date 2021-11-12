import { Alert } from '@aws-amplify/ui-react';

export const DismissibleAlertExample = () => {
  return (
    <>
      <Alert>This Alert is not dismissible by default</Alert>
      <Alert isDismissible={true}>Click the X to dismiss this Alert</Alert>
    </>
  );
};
