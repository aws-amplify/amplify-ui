import { PasswordField } from '@aws-amplify/ui-react';

export const PasswordFieldErrorExample = () => (
  <PasswordField
    label="Password"
    defaultValue="1234"
    hasError={true}
    errorMessage="Password should not be 1234! 😱"
  />
);
