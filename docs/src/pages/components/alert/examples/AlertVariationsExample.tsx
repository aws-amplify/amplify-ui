import { Alert } from '@aws-amplify/ui-react';

export const AlertVariationsExample = () => {
  return (
    <>
      <Alert variation="info">Info</Alert>
      <Alert variation="error">Error</Alert>
      <Alert variation="warning">Warning</Alert>
      <Alert variation="success">Success</Alert>
      <Alert>Default</Alert>
    </>
  );
};
