import { Alert } from '@aws-amplify/ui-react';

export const AlertHeadingExample = () => {
  return (
    <>
      <Alert variation="warning">This Alert does not have a heading</Alert>
      <Alert variation="success" heading="This is the heading">
        Cool heading!
      </Alert>
    </>
  );
};
