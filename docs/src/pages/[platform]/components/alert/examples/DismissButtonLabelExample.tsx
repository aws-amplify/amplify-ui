import { Alert } from '@aws-amplify/ui-react';

export const DismissButtonLabelExample = () => {
  return (
    <Alert dismissButtonLabel="Custom dismiss button label" isDismissible>
      Configure a custom aria label for the dismiss button
    </Alert>
  );
};
