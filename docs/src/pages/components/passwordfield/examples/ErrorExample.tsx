import { PasswordField } from '@aws-amplify/ui-react';

export const ErrorExample = () => (
  <PasswordField
    label="Password"
    defaultValue="1234"
    hasError={true}
    errorMessage="Password should not be 1234! 😱"
  />
);
