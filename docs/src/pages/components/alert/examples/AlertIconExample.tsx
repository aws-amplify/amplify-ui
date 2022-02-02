import { Alert } from '@aws-amplify/ui-react';

export const AlertIconExample = () => {
  return (
    <>
      <Alert variation="info">This Alert shows an icon by default</Alert>
      <Alert variation="error" hasIcon={false}>
        This Alert does not have an icon
      </Alert>
      <Alert variation="success">This Alert has a large icon</Alert>
    </>
  );
};
